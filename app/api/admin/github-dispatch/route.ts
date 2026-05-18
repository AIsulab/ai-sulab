import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // 1. Verify Admin Cookie
    const adminToken = cookies().get('admin_token')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized: Not logged in' }, { status: 401 });
    }

    const body = await request.json();
    const { mode, keyword, topic, publish_now } = body;

    // 2. Validate Inputs
    if (mode === 'custom') {
      if (!keyword?.trim() || !topic?.trim()) {
        return NextResponse.json({ error: 'Keyword and Topic are required for custom mode.' }, { status: 400 });
      }
    }

    // 3. Check GitHub Environment Variables
    const { GITHUB_PAT, GITHUB_OWNER, GITHUB_REPO, GITHUB_WORKFLOW_ID, GITHUB_REF } = process.env;
    if (!GITHUB_PAT || !GITHUB_OWNER || !GITHUB_REPO || !GITHUB_WORKFLOW_ID || !GITHUB_REF) {
      console.error('Missing GitHub Environment Variables');
      return NextResponse.json({ error: 'Server configuration error: Missing GitHub credentials.' }, { status: 500 });
    }

    // 4. Call GitHub Actions API
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${GITHUB_WORKFLOW_ID}/dispatches`;
    
    const githubResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: GITHUB_REF,
        inputs: {
          mode: mode || 'auto',
          keyword: keyword || '',
          topic: topic || '',
          publish_now: String(publish_now === undefined ? true : publish_now),
        },
      }),
    });

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('GitHub API Error:', githubResponse.status, errorText);
      return NextResponse.json(
        { error: `GitHub API Error: ${githubResponse.statusText}`, details: errorText },
        { status: githubResponse.status }
      );
    }

    return NextResponse.json({
      message: 'Workflow dispatched successfully!',
      status: 'success',
      url: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/actions`
    });
  } catch (error: any) {
    console.error('Error dispatching workflow:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
