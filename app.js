const CATS = [
  { id: 'all', label: '전체' },
  { id: 'automation', label: 'AI 자동화' },
  { id: 'youtube', label: '유튜브 파이프라인' },
  { id: 'affiliate', label: '쿠팡/제휴마케팅' },
  { id: 'saas', label: 'SaaS 구축' },
  { id: 'content', label: 'AI 콘텐츠' },
]

const storageKey = 'targo-ai-leads'
const endpointKey = 'TARGO_LEAD_ENDPOINT'
const activeToast = { timer: null }

const state = {
  prompts: [],
  filtered: [],
  query: '',
  category: 'all',
  leads: loadStoredLeads().length,
}

const els = {}

document.addEventListener('DOMContentLoaded', init)

async function init() {
  cacheElements()
  bindStaticEvents()
  renderCategories()
  await loadPrompts()
  renderLeadStats()
  filterAndRender()
}

function cacheElements() {
  els.searchInput = document.getElementById('searchInput')
  els.categoryFilters = document.getElementById('categoryFilters')
  els.promptGrid = document.getElementById('promptGrid')
  els.resultCount = document.getElementById('resultCount')
  els.toast = document.getElementById('toast')
  els.leadForm = document.getElementById('leadCaptureForm')
  els.statPrompts = document.querySelector('[data-stat="prompts"]')
  els.statCategories = document.querySelector('[data-stat="categories"]')
  els.statLeads = document.querySelector('[data-stat="leads"]')
}

function bindStaticEvents() {
  els.searchInput?.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLowerCase()
    filterAndRender()
  })

  document.querySelector('[data-scroll-library]')?.addEventListener('click', () => {
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })

  els.categoryFilters?.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null
    const button = target?.closest('button[data-category]')
    if (!button) return
    state.category = button.dataset.category
    updateActiveCategory()
    filterAndRender()
  })

  els.promptGrid?.addEventListener('click', async (event) => {
    const target = event.target instanceof Element ? event.target : null
    const copyButton = target?.closest('button[data-copy-id]')
    if (!copyButton) return

    const prompt = state.prompts.find((item) => String(item.id) === copyButton.dataset.copyId)
    if (!prompt) return

    const copied = await copyText(prompt.prompt)
    if (copied) {
      copyButton.classList.add('is-copied')
      const originalLabel = copyButton.textContent
      copyButton.textContent = '복사됨'
      showToast(`"${prompt.title}" 프롬프트를 복사했습니다.`)

      window.setTimeout(() => {
        copyButton.textContent = originalLabel
        copyButton.classList.remove('is-copied')
      }, 1200)
    }
  })

  els.leadForm?.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(els.leadForm)
    const lead = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      interest: String(formData.get('interest') || 'automation'),
      createdAt: new Date().toISOString(),
      source: 'AI 자동화 프롬프트 라이브러리',
    }

    if (!lead.email) {
      showToast('이메일을 입력해 주세요.')
      return
    }

    await saveLead(lead)
    els.leadForm.reset()
    renderLeadStats()
    showToast('템플릿 요청이 저장되었습니다. 후속 안내 흐름으로 연결할 수 있습니다.')
  })
}

function renderCategories() {
  if (!els.categoryFilters) return

  els.categoryFilters.innerHTML = CATS.map((item) => {
    const active = item.id === state.category ? ' is-active' : ''
    return `<button type="button" class="chip${active}" data-category="${item.id}">${item.label}</button>`
  }).join('')
}

function updateActiveCategory() {
  els.categoryFilters?.querySelectorAll('[data-category]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.category === state.category)
  })
}

async function loadPrompts() {
  try {
    const response = await fetch('./data.json', { cache: 'no-store' })
    if (!response.ok) throw new Error(`Failed to load prompts: ${response.status}`)
    const data = await response.json()
    state.prompts = Array.isArray(data) ? data : data.prompts || []
  } catch (error) {
    console.error(error)
    state.prompts = []
    showToast('data.json을 불러오지 못했습니다. 정적 서버에서 확인해 주세요.')
  }
}

function filterAndRender() {
  state.filtered = state.prompts.filter(matchesFilter)
  renderLeadStats()
  renderPromptCards()
}

function matchesFilter(prompt) {
  const haystack = [
    prompt.title,
    prompt.summary,
    prompt.prompt,
    prompt.category,
    categoryLabel(prompt.category),
    ...(prompt.tags || []),
  ]
    .join(' ')
    .toLowerCase()

  const matchesCategory = state.category === 'all' || prompt.category === state.category
  const matchesQuery = !state.query || haystack.includes(state.query)

  return matchesCategory && matchesQuery
}

function renderLeadStats() {
  const promptCount = state.prompts.length
  const categoryCount = CATS.length - 1

  if (els.statPrompts) els.statPrompts.textContent = String(promptCount)
  if (els.statCategories) els.statCategories.textContent = String(categoryCount)
  if (els.statLeads) els.statLeads.textContent = state.leads > 0 ? String(state.leads) : '—'
  if (els.resultCount) {
    els.resultCount.textContent = `${state.filtered.length}개 결과`
  }
}

function renderPromptCards() {
  if (!els.promptGrid) return

  if (state.filtered.length === 0) {
    els.promptGrid.innerHTML = `
      <div class="empty-state">
        검색 조건에 맞는 결과가 없습니다. 카테고리를 바꾸거나 검색어를 지워 보세요.
      </div>
    `
    return
  }

  els.promptGrid.innerHTML = state.filtered.map(renderPromptCard).join('')
}

function renderPromptCard(prompt, index) {
  const indexLabel = String(index + 1).padStart(2, '0')
  const tags = (prompt.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')
  const preview = escapeHtml(prompt.prompt.slice(0, 260))

  return `
    <article class="prompt-card" data-cat="${prompt.category}">
      <div class="prompt-card__head">
        <span class="chip">${categoryLabel(prompt.category)}</span>
        <span class="prompt-card__index">#${indexLabel}</span>
      </div>
      <h3>${escapeHtml(prompt.title)}</h3>
      <p>${escapeHtml(prompt.summary)}</p>
      <div class="prompt-snippet">${preview}${prompt.prompt.length > 260 ? '...' : ''}</div>
      <div class="tag-list">${tags}</div>
      <div class="prompt-card__footer">
        <button type="button" class="copy-btn" data-copy-id="${prompt.id}">프롬프트 복사</button>
        <span class="prompt-card__hint">검색 · 필터 · 복사 지원</span>
      </div>
    </article>
  `
}

function categoryLabel(categoryId) {
  return CATS.find((item) => item.id === categoryId)?.label ?? categoryId
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', 'true')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    textarea.remove()
    return copied
  } catch (error) {
    console.error(error)
    showToast('복사에 실패했습니다. 브라우저 권한을 확인해 주세요.')
    return false
  }
}

function loadStoredLeads() {
  try {
    const raw = localStorage.getItem(storageKey)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function saveLead(lead) {
  const leads = loadStoredLeads()
  leads.unshift(lead)
  localStorage.setItem(storageKey, JSON.stringify(leads.slice(0, 200)))
  state.leads = leads.length

  const endpoint = window[endpointKey]
  if (typeof endpoint === 'string' && endpoint.trim()) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
    } catch (error) {
      console.error(error)
      showToast('외부 리드 엔드포인트 전송은 실패했지만 로컬에는 저장했습니다.')
    }
  }
}

function showToast(message) {
  if (!els.toast) return

  els.toast.textContent = message
  els.toast.classList.add('is-visible')

  if (activeToast.timer) {
    window.clearTimeout(activeToast.timer)
  }

  activeToast.timer = window.setTimeout(() => {
    els.toast.classList.remove('is-visible')
  }, 2200)
}
