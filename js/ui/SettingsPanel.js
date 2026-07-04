const DIFFICULTY_PRESETS = {
  easy: { label: '쉬움', description: '장애는 느리게, 리소스는 넉넉하게', failureRate: 0.5, resourceMultiplier: 1.5 },
  normal: { label: '보통', description: '균형 잡힌 플레이 경험', failureRate: 1.0, resourceMultiplier: 1.0 },
  hard: { label: '어려움', description: '장애는 빠르게, 리소스는 적게', failureRate: 2.0, resourceMultiplier: 0.75 },
  nightmare: { label: '악몽', description: '쉴 틈 없는 카오스', failureRate: 3.0, resourceMultiplier: 0.5 },
};

const STORAGE_KEY = 'k8sgames_settings';

export class SettingsPanel {
  constructor() {
    this.container = null;
    this.visible = false;
    this.settings = this._loadSettings();
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'ingame-settings-panel';
    this.container.className = 'fixed inset-0 z-50 hidden';
    this.container.innerHTML = this._buildHTML();
    document.body.appendChild(this.container);
    this._bindEvents();
    this._applySettings();
  }

  _loadSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      difficulty: 'normal',
      showMinimap: true,
      showMetrics: false,
      cameraSpeed: 1.0,
      particleEffects: true,
      showConnectionLines: true,
      autoExpandIncidents: true,
      showHints: true,
      soundEnabled: false,
    };
  }

  _saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch (e) {}
  }

  _buildHTML() {
    const diff = this.settings.difficulty;
    return `
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-action="backdrop"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] max-h-[80vh] overflow-y-auto rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl">
        <div class="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 class="text-white/90 text-base font-semibold">설정</h2>
          <button data-action="close" class="p-1 text-white/30 hover:text-white/60 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="px-6 py-4 space-y-6">
          <div>
            <div class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">난이도</div>
            <div class="grid grid-cols-2 gap-2">
              ${Object.entries(DIFFICULTY_PRESETS).map(([key, preset]) => `
                <button class="settings-difficulty px-3 py-2 rounded-lg border text-left transition-all ${key === diff ? 'border-sky-500/50 bg-sky-500/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}" data-difficulty="${key}">
                  <div class="text-sm font-medium ${key === diff ? 'text-sky-400' : 'text-white/70'}">${preset.label}</div>
                  <div class="text-[10px] text-white/30 mt-0.5">${preset.description}</div>
                </button>
              `).join('')}
            </div>
          </div>

          <div>
            <div class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">표시</div>
            <div class="space-y-2">
              ${this._buildToggle('showMinimap', '미니맵 표시', '오른쪽 아래에 클러스터 전체 개요를 표시합니다')}
              ${this._buildToggle('showConnectionLines', '연결선 표시', '리소스 간 소유 관계와 네트워크 연결을 표시합니다')}
              ${this._buildToggle('particleEffects', '파티클 효과', '연결선을 따라 이동하는 트래픽 애니메이션을 표시합니다')}
              ${this._buildToggle('autoExpandIncidents', 'Incident 자동 펼침', '새 incident의 조사 단계를 자동으로 보여줍니다')}
            </div>
          </div>

          <div>
            <div class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">게임플레이</div>
            <div class="space-y-2">
              ${this._buildToggle('showHints', '힌트 표시', '캠페인 레벨 목표에 대한 힌트를 표시합니다')}
            </div>
          </div>

          <div>
            <div class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">카메라 속도</div>
            <div class="flex items-center gap-3">
              <input type="range" data-action="camera-speed" min="0.5" max="2.0" step="0.1" value="${this.settings.cameraSpeed}" class="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-sky-400">
              <span data-label="camera-speed-val" class="text-white/60 text-xs font-mono w-8">${this.settings.cameraSpeed}x</span>
            </div>
          </div>

          <div class="pt-2 border-t border-white/5">
            <div class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">데이터</div>
            <div class="flex gap-2">
              <button data-action="reset-progress" class="px-3 py-1.5 text-xs text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors">진행도 초기화</button>
              <button data-action="export" class="px-3 py-1.5 text-xs text-white/50 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">저장 데이터 내보내기</button>
            </div>
          </div>
        </div>

        <div class="px-6 py-3 border-t border-white/5 flex justify-end">
          <button data-action="done" class="px-4 py-1.5 text-sm text-sky-400 bg-sky-400/10 rounded-lg hover:bg-sky-400/20 transition-colors font-medium">완료</button>
        </div>
      </div>
    `;
  }

  _buildToggle(key, label, description) {
    const checked = this.settings[key];
    return `
      <div class="flex items-center justify-between py-1.5">
        <div>
          <div class="text-white/70 text-sm">${label}</div>
          <div class="text-white/25 text-[10px]">${description}</div>
        </div>
        <button class="settings-toggle relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-sky-500' : 'bg-white/10'}" data-key="${key}">
          <div class="absolute top-0.5 ${checked ? 'left-[18px]' : 'left-0.5'} w-4 h-4 bg-white rounded-full shadow transition-all"></div>
        </button>
      </div>
    `;
  }

  _bindEvents() {
    const $ = (sel) => this.container.querySelector(sel);

    $('[data-action="backdrop"]').addEventListener('click', () => this.hide());
    $('[data-action="close"]').addEventListener('click', () => this.hide());
    $('[data-action="done"]').addEventListener('click', () => this.hide());

    this.container.querySelectorAll('.settings-difficulty').forEach(btn => {
      btn.addEventListener('click', () => {
        this.settings.difficulty = btn.dataset.difficulty;
        this._saveSettings();
        this._applySettings();
        this._rerender();
      });
    });

    this.container.querySelectorAll('.settings-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        this.settings[key] = !this.settings[key];
        this._saveSettings();
        this._applySettings();
        this._rerender();
      });
    });

    const slider = $('[data-action="camera-speed"]');
    if (slider) {
      slider.addEventListener('input', () => {
        this.settings.cameraSpeed = parseFloat(slider.value);
        $('[data-label="camera-speed-val"]').textContent = this.settings.cameraSpeed + 'x';
        this._saveSettings();
        this._applySettings();
      });
    }

    $('[data-action="reset-progress"]').addEventListener('click', () => {
      if (confirm('모든 게임 진행도를 초기화할까요? 이 작업은 되돌릴 수 없습니다.')) {
        localStorage.removeItem('k8sgames_progress');
        localStorage.removeItem('k8sgames_investigation');
        window.location.reload();
      }
    });

    $('[data-action="export"]').addEventListener('click', () => {
      const data = {
        progress: localStorage.getItem('k8sgames_progress'),
        settings: localStorage.getItem(STORAGE_KEY),
        investigation: localStorage.getItem('k8sgames_investigation'),
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `k8sgames-save-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  _rerender() {
    const scrollTop = this.container.querySelector('.overflow-y-auto')?.scrollTop || 0;
    this.container.innerHTML = this._buildHTML();
    this._bindEvents();
    const scroller = this.container.querySelector('.overflow-y-auto');
    if (scroller) scroller.scrollTop = scrollTop;
  }

  _applySettings() {
    const engine = window.game?.engine;
    const gameEngine = window.game?.gameEngine;

    if (gameEngine?.setDifficulty) {
      gameEngine.setDifficulty(this.settings.difficulty);
    }
    if (engine) {
      engine.emit('settings:changed', this.settings);
    }

    const minimap = document.getElementById('minimap');
    if (minimap) minimap.style.display = this.settings.showMinimap ? '' : 'none';
  }

  show() {
    this.visible = true;
    this.container.classList.remove('hidden');
    this._rerender();
  }

  hide() {
    this.visible = false;
    this.container.classList.add('hidden');
  }

  toggle() {
    if (this.visible) this.hide();
    else this.show();
  }

  getSettings() {
    return { ...this.settings };
  }

  destroy() {
    this.container?.remove();
  }
}
