/* SULAB — minimal redesign client logic
   Same data shape and behavior as original (data.json + leadCaptureForm)
*/

const CATS = [
  { id: 'all', label: '전체' },
  { id: 'automation', label: 'AI 자동화' },
  { id: 'youtube', label: '유튜브 파이프라인' },
  { id: 'affiliate', label: '쿠팡/어필리에이트' },
  { id: 'saas', label: 'SaaS 구축' },
  { id: 'content', label: 'AI 콘텐츠' },
];

const storageKey = 'sulab-leads';
const endpointKey = 'SULAB_LEAD_ENDPOINT';
const activeToast = { timer: null };

const state = {
  prompts: [],
  filtered: [],
  query: '',
  category: 'all',
  leads: loadStoredLeads().length,
  pageSize: 9,
  visible: 9,
};

const els = {};

document.addEventListener('DOMContentLoaded', init);

async function init() {
  cacheElements();
  bindStaticEvents();
  renderCategories();
  await loadPrompts();
  renderStats();
  filterAndRender();
}

function cacheElements() {
  els.searchInput = document.getElementById('searchInput');
  els.categoryFilters = document.getElementById('categoryFilters');
  els.promptGrid = document.getElementById('promptGrid');
  els.resultCount = document.getElementById('resultCount');
  els.toast = document.getElementById('toast');
  els.leadForm = document.getElementById('leadCaptureForm');
  els.statPrompts = document.querySelector('[data-stat="prompts"]');
  els.statCategories = document.querySelector('[data-stat="categories"]');
  els.loadMoreWrap = document.getElementById('loadMoreWrap');
  els.loadMoreBtn = document.getElementById('loadMoreBtn');
  els.loadMoreMeta = document.getElementById('loadMoreMeta');
}

function bindStaticEvents() {
  els.searchInput?.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLowerCase();
    state.visible = state.pageSize;
    filterAndRender();
  });

  els.categoryFilters?.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest('button[data-category]');
    if (!button) return;
    state.category = button.dataset.category;
    state.visible = state.pageSize;
    updateActiveCategory();
    filterAndRender();
  });

  els.loadMoreBtn?.addEventListener('click', () => {
    state.visible += state.pageSize;
    renderPromptCards();
  });

  els.promptGrid?.addEventListener('click', async (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const copyButton = target?.closest('button[data-copy-id]');
    if (!copyButton) return;

    const prompt = state.prompts.find((item) => String(item.id) === copyButton.dataset.copyId);
    if (!prompt) return;

    const copied = await copyText(prompt.prompt);
    if (copied) {
      copyButton.classList.add('is-copied');
      const originalLabel = copyButton.textContent;
      copyButton.textContent = '복사됨';
      showToast(`"${prompt.title}" 프롬프트를 복사했습니다.`);

      window.setTimeout(() => {
        copyButton.textContent = originalLabel;
        copyButton.classList.remove('is-copied');
      }, 1400);
    }
  });

  els.leadForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(els.leadForm);
    const lead = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      interest: String(formData.get('interest') || 'automation'),
      createdAt: new Date().toISOString(),
      source: 'SULAB Library',
    };

    if (!lead.email) {
      showToast('이메일을 입력해 주세요.');
      return;
    }

    await saveLead(lead);
    els.leadForm.reset();
    showToast('템플릿 요청이 저장되었습니다.');
  });
}

function renderCategories() {
  if (!els.categoryFilters) return;
  els.categoryFilters.innerHTML = CATS.map((item) => {
    const active = item.id === state.category ? ' is-active' : '';
    return `<button type="button" class="chip${active}" data-category="${item.id}">${item.label}</button>`;
  }).join('');
}

function updateActiveCategory() {
  els.categoryFilters?.querySelectorAll('[data-category]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.category === state.category);
  });
}

async function loadPrompts() {
  try {
    const response = await fetch('./data.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to load prompts: ${response.status}`);
    const data = await response.json();
    state.prompts = Array.isArray(data) ? data : data.prompts || [];
  } catch (error) {
    console.error(error);
    state.prompts = [];
    showToast('data.json을 불러오지 못했습니다.');
  }
}

function filterAndRender() {
  state.filtered = state.prompts.filter(matchesFilter);
  renderStats();
  renderPromptCards();
}

function matchesFilter(prompt) {
  const haystack = [
    prompt.title,
    prompt.summary,
    prompt.prompt,
    prompt.category,
    categoryLabel(prompt.category),
    ...(prompt.tags || []),
  ].join(' ').toLowerCase();

  const matchesCategory = state.category === 'all' || prompt.category === state.category;
  const matchesQuery = !state.query || haystack.includes(state.query);
  return matchesCategory && matchesQuery;
}

function renderStats() {
  if (els.statPrompts) els.statPrompts.textContent = String(state.prompts.length);
  if (els.statCategories) els.statCategories.textContent = String(CATS.length - 1);
  if (els.resultCount) els.resultCount.textContent = `${state.filtered.length}개 결과`;
}

function renderPromptCards() {
  if (!els.promptGrid) return;
  if (state.filtered.length === 0) {
    els.promptGrid.innerHTML = `
      <div class="empty">
        검색 조건에 맞는 결과가 없습니다. 카테고리를 바꾸거나 검색어를 지워보세요.
      </div>
    `;
    if (els.loadMoreWrap) els.loadMoreWrap.hidden = true;
    return;
  }
  const visibleItems = state.filtered.slice(0, state.visible);
  els.promptGrid.innerHTML = visibleItems.map(renderPromptCard).join('');

  if (els.loadMoreWrap) {
    const remaining = state.filtered.length - visibleItems.length;
    if (remaining > 0) {
      els.loadMoreWrap.hidden = false;
      if (els.loadMoreBtn) {
        els.loadMoreBtn.textContent = `더 보기 (+${remaining})`;
      }
      if (els.loadMoreMeta) {
        els.loadMoreMeta.textContent = `${visibleItems.length} / ${state.filtered.length}`;
      }
    } else {
      els.loadMoreWrap.hidden = true;
    }
  }
}

function renderPromptCard(prompt, index) {
  const indexLabel = String(index + 1).padStart(2, '0');
  const tags = (prompt.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
  const preview = escapeHtml(prompt.prompt.slice(0, 220));

  return `
    <article class="card" data-cat="${prompt.category}">
      <div class="card-head">
        <span class="card-cat">${categoryLabel(prompt.category)}</span>
        <span class="card-index">#${indexLabel}</span>
      </div>
      <h3>${escapeHtml(prompt.title)}</h3>
      <p>${escapeHtml(prompt.summary)}</p>
      <div class="snippet">${preview}${prompt.prompt.length > 220 ? '…' : ''}</div>
      <div class="tags">${tags}</div>
      <div class="card-foot">
        <button type="button" class="copy-btn" data-copy-id="${prompt.id}">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="3.5" y="3.5" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
            <path d="M5.5 3V2A1 1 0 0 1 6.5 1H10a1 1 0 0 1 1 1v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
          프롬프트 복사
        </button>
        <span class="card-hint">검색·필터·복사 지원</span>
      </div>
    </article>
  `;
}

function categoryLabel(categoryId) {
  return CATS.find((item) => item.id === categoryId)?.label ?? categoryId;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'true');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  } catch (error) {
    console.error(error);
    showToast('복사에 실패했습니다.');
    return false;
  }
}

function loadStoredLeads() {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveLead(lead) {
  const leads = loadStoredLeads();
  leads.unshift(lead);
  localStorage.setItem(storageKey, JSON.stringify(leads.slice(0, 200)));
  state.leads = leads.length;

  const endpoint = window[endpointKey];
  if (typeof endpoint === 'string' && endpoint.trim()) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (error) {
      console.error(error);
      showToast('외부 엔드포인트 전송 실패. 로컬에는 저장됨.');
    }
  }
}

function showToast(message) {
  if (!els.toast) return;
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  if (activeToast.timer) window.clearTimeout(activeToast.timer);
  activeToast.timer = window.setTimeout(() => {
    els.toast.classList.remove('is-visible');
  }, 2200);
}
