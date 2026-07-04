/*
 * Korean localization additions for the unofficial Korean distribution.
 * Modified from K8s Games, Copyright 2026 Rohit Ghumare, Apache-2.0.
 */

const CAMPAIGN_KO = {
  1: {
    title: '첫 번째 Pod',
    description: 'Pod는 Kubernetes에서 배포할 수 있는 가장 작은 단위입니다. 하나 이상의 컨테이너가 네트워크 네임스페이스와 스토리지 볼륨을 공유합니다. 이 레벨에서는 Pod를 만들고 Namespace로 리소스를 분리합니다.',
    objectives: ['Pod 배포하기 (K8s의 기본 실행 단위)', '리소스 격리를 위한 Namespace 만들기'],
    hints: [
      '"kubectl run my-pod --image=nginx"를 입력해 nginx 컨테이너를 실행하는 Pod를 만드세요.',
      '"kubectl create namespace staging"을 입력해 Namespace를 만드세요. Namespace는 물리 클러스터 안의 가상 클러스터처럼 동작합니다.',
      'Pod를 클릭해 단계(Pending -> ContainerCreating -> Running), IP, condition을 확인하세요.'
    ]
  },
  2: {
    title: 'Deployment와 ReplicaSet',
    description: '프로덕션에서는 보통 단독 Pod를 직접 만들지 않습니다. Deployment는 원하는 상태를 선언하고 ReplicaSet이 Pod 수를 맞추도록 합니다. 이것이 Kubernetes의 self-healing을 가능하게 하는 조정 루프입니다.',
    objectives: ['Deployment 만들기 (원하는 Pod 상태 선언)', 'ReplicaSet이 수렴하도록 replica를 3개로 확장하기'],
    hints: [
      '"kubectl create deployment web"을 입력하고 Deployment -> ReplicaSet -> Pod 소유 관계를 관찰하세요.',
      '"kubectl scale deployment web --replicas=3"으로 replica를 늘리세요.',
      'Pod 하나를 삭제해 보세요. ReplicaSet이 차이를 감지하고 다시 만듭니다.'
    ]
  },
  3: {
    title: '스케줄링과 멀티 노드 클러스터',
    description: 'kube-scheduler는 CPU/메모리, affinity, taint/toleration 등을 기준으로 Pod를 Node에 배치합니다. 여러 Node에 분산하면 한 Node가 실패해도 다른 Node의 Pod가 계속 트래픽을 처리할 수 있습니다.',
    objectives: ['Node를 3개로 확장하기', 'Pod 6개 실행해 scheduler 분산 확인하기', 'Pod가 최소 2개 Node에 배치되게 하기'],
    hints: [
      '"kubectl create node"로 Node를 추가하세요.',
      'replica가 있는 Deployment를 만들면 scheduler가 가용 리소스에 따라 Pod를 배치합니다.',
      'Node를 클릭해 allocatable CPU/메모리와 배치된 Pod 수를 확인하세요.'
    ]
  },
  4: {
    title: 'CrashLoopBackOff',
    description: 'CrashLoopBackOff는 컨테이너가 시작 후 반복적으로 종료되고 Kubernetes가 재시작 간격을 점점 늘리는 상태입니다. describe와 logs --previous로 원인을 추적합니다.',
    objectives: ['CrashLoopBackOff 진단 및 해결', '클러스터 health 95% 이상 유지'],
    hints: [
      '붉게 표시되는 Pod를 클릭해 restartCount와 Waiting 상태를 확인하세요.',
      '실제 K8s에서는 "kubectl describe pod <name>"과 "kubectl logs <name> --previous"를 사용합니다.',
      '흔한 원인은 잘못된 이미지 태그, 누락된 환경 변수, OOM, 잘못된 entrypoint입니다.'
    ]
  },
  5: { title: 'Self-Healing과 Pod Eviction' },
  6: { title: 'DaemonSet: Node마다 하나의 Pod' },
  7: { title: 'Job과 CronJob: 배치 처리' },
  8: { title: 'Rolling Update와 Rollback' },
  9: { title: 'Service와 서비스 디스커버리' },
  10: { title: 'Ingress: L7 HTTP 라우팅' },
  11: { title: 'NetworkPolicy: Zero Trust' },
  12: { title: 'DNS 디버깅' },
  13: { title: 'ConfigMap 기본기' },
  14: { title: 'Secret 운영' },
  15: { title: '영구 스토리지' },
  16: { title: 'StatefulSet 데이터베이스' },
  17: { title: '프로덕션 준비성' },
  18: { title: 'RBAC 방어선' },
  19: { title: '멀티 노드 장애' },
  20: { title: '풀스택 프로덕션' }
};

const CHAPTERS_KO = [
  { name: '기초', description: 'Pod, Deployment, 스케줄링, 첫 incident 대응' },
  { name: 'Workload', description: 'Self-healing, DaemonSet, 배치 Job, Rolling Update 전략' },
  { name: '네트워킹', description: 'Service, Ingress L7 라우팅, NetworkPolicy, DNS 디버깅' },
  { name: '상태와 설정', description: '상태 저장과 설정 관리' },
  { name: '프로덕션', description: '프로덕션급 클러스터 구축' }
];

const CHALLENGE_TITLES_KO = {
  'Three-Tier Web App': '3계층 웹 앱',
  'Fix CrashLoopBackOff': 'CrashLoopBackOff 해결',
  'Ingress with TLS': 'TLS가 적용된 Ingress',
  'Network Segmentation': '네트워크 분리',
  'Black Friday Scaling': '블랙프라이데이 스케일링',
  'Node Failure Recovery': 'Node 장애 복구',
  'StatefulSet with PVC': 'PVC를 사용하는 StatefulSet',
  'RBAC Fortress': 'RBAC 방어선',
  'DNS Resolution Failure': 'DNS 해석 실패',
  'Full Production Readiness': '전체 프로덕션 준비성'
};

const STATIC_TEXT_KO = [
  ['.menu-subtitle', 'Kubernetes 클러스터 시뮬레이션'],
  ['.github-text', 'GitHub에서 Star'],
  ['[data-mode="campaign"] .menu-btn-title', '캠페인'],
  ['[data-mode="campaign"] .menu-btn-desc', 'Pod부터 프로덕션까지 20개 레벨로 단계별 학습'],
  ['[data-mode="chaos"] .menu-btn-title', '카오스 모드'],
  ['[data-mode="chaos"] .menu-btn-desc', '점점 커지는 장애를 버티는 SRE 훈련'],
  ['[data-mode="sandbox"] .menu-btn-title', '샌드박스'],
  ['[data-mode="sandbox"] .menu-btn-desc', '자유롭게 클러스터를 설계하고 점수를 확인'],
  ['[data-mode="challenge"] .menu-btn-title', '챌린지'],
  ['[data-mode="challenge"] .menu-btn-desc', '10개의 시간 제한 시나리오에서 장애를 해결'],
  ['.menu-draw-link > span:first-of-type', 'K8s Draw'],
  ['.menu-draw-desc', '3D로 K8s 아키텍처를 설계하고 YAML로 내보내기'],
  ['#btn-settings', '설정'],
  ['#btn-achievements', '업적'],
  ['#btn-stats', '통계'],
  ['#btn-show-hint', '힌트 보기'],
  ['#btn-auto-align', '자동 정렬'],
  ['#btn-reset-camera', '화면 초기화'],
  ['#btn-help', '도움말']
];

export function applyKoreanLocale({ CAMPAIGN_LEVELS, CHAPTERS, ACHIEVEMENTS, CHALLENGES } = {}) {
  document.documentElement.lang = 'ko';
  document.title = 'K8s Games 한국어 배포판 - Kubernetes 클러스터 시뮬레이션';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = '게임으로 Kubernetes를 배워보세요. Pod를 배포하고, 장애를 처리하고, kubectl 명령을 익힙니다.';
  }

  for (const [selector, text] of STATIC_TEXT_KO) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  const hints = document.querySelector('.menu-keyboard-hints');
  if (hints) {
    hints.innerHTML = '<span class="keyboard-hint">/</span> kubectl &middot; <span class="keyboard-hint">Space</span> 일시정지 &middot; <span class="keyboard-hint">M</span> 메트릭 &middot; <span class="keyboard-hint">Esc</span> 메뉴';
  }

  if (Array.isArray(CHAPTERS)) {
    CHAPTERS.forEach((chapter, index) => Object.assign(chapter, CHAPTERS_KO[index] || {}));
  }

  if (Array.isArray(CAMPAIGN_LEVELS)) {
    CAMPAIGN_LEVELS.forEach((level) => {
      const ko = CAMPAIGN_KO[level.id];
      if (!ko) return;
      if (ko.title) level.title = ko.title;
      if (ko.description) level.description = ko.description;
      if (ko.objectives && Array.isArray(level.objectives)) {
        level.objectives.forEach((objective, index) => {
          if (ko.objectives[index]) objective.label = ko.objectives[index];
        });
      }
      if (ko.hints) level.hints = ko.hints;
      level.chapterName = CHAPTERS?.[level.chapter - 1]?.name || level.chapterName;
    });
  }

  if (Array.isArray(CHALLENGES)) {
    CHALLENGES.forEach((challenge) => {
      if (CHALLENGE_TITLES_KO[challenge.title]) {
        challenge.title = CHALLENGE_TITLES_KO[challenge.title];
      }
    });
  }

  if (Array.isArray(ACHIEVEMENTS)) {
    ACHIEVEMENTS.forEach((achievement) => {
      if (achievement.name === 'First Steps') achievement.name = '첫걸음';
      if (achievement.name === 'Pod Master') achievement.name = 'Pod 마스터';
      if (achievement.name === 'Incident Commander') achievement.name = 'Incident Commander';
    });
  }

  window.K8S_GAMES_KO = {
    unofficial: true,
    notice: '비공식 한국어 배포판입니다. 원본 K8s Games는 Rohit Ghumare가 Apache-2.0으로 배포했습니다.'
  };
}
