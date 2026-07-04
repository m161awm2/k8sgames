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
  5: {
    title: 'Self-Healing과 Pod Eviction',
    description: 'Node의 메모리나 디스크가 부족하면 kubelet은 우선순위에 따라 Pod를 evict합니다. ReplicaSet은 원하는 replica 수와 실제 상태의 차이를 감지하고 건강한 Node에 replacement Pod를 만듭니다.',
    objectives: ['서로 다른 마이크로서비스 Deployment 3개 실행', '각 Deployment를 replica 2개 이상으로 구성', '다운타임 없이 Pod eviction 2건 대응'],
    hints: ['web, api, worker 같은 Deployment를 만들고 각각 2개 이상으로 scale하세요.', 'Eviction이 발생하면 ReplicaSet이 replacement Pod를 자동 생성합니다.', 'resource request/limit을 설정하면 BestEffort eviction 위험을 줄일 수 있습니다.']
  },
  6: {
    title: 'DaemonSet: Node마다 하나의 Pod',
    description: 'DaemonSet은 모든 Node 또는 선택된 Node마다 Pod 한 개가 실행되도록 보장합니다. 로그 수집기, 모니터링 에이전트, CNI 플러그인처럼 Node 단위로 필요한 구성요소에 사용됩니다.',
    objectives: ['DaemonSet 만들기', 'Node를 4개로 확장하기', '모든 Node에서 DaemonSet Pod 실행 확인'],
    hints: ['팔레트에서 DaemonSet을 생성하세요.', 'Node를 추가하면 DaemonSet controller가 자동으로 Pod를 배치합니다.', 'DaemonSet의 desiredNumberScheduled와 currentNumberScheduled를 확인하세요.']
  },
  7: {
    title: 'Job과 CronJob: 배치 처리',
    description: 'Job은 Pod를 완료 상태까지 실행하고 성공 횟수를 추적합니다. CronJob은 cron 스케줄에 따라 Job을 주기적으로 생성합니다.',
    objectives: ['Job 2개 만들기', '두 Job이 Complete 상태가 되게 하기', 'CronJob 1개 만들기'],
    hints: ['Job Pod는 Pending -> Running -> Succeeded 순서로 진행됩니다.', 'CronJob schedule은 "*/5 * * * *" 같은 cron 문법을 사용합니다.', 'activeDeadlineSeconds나 backoffLimit 초과 시 Job은 실패할 수 있습니다.']
  },
  8: {
    title: 'Rolling Update와 Rollback',
    description: 'Deployment를 업데이트하면 새 ReplicaSet이 만들어지고 기존 ReplicaSet은 점진적으로 줄어듭니다. 새 버전이 실패하면 rollout undo로 이전 ReplicaSet으로 되돌릴 수 있습니다.',
    objectives: ['Rolling update 트리거', '이미지 pull 실패 시 rollback', 'rollout 중 90% 가용성 유지'],
    hints: ['api-server를 우클릭해 Rolling Update를 실행하세요.', 'ImagePullBackOff는 대개 잘못된 이미지 태그 때문입니다.', '"kubectl rollout undo deployment api-server"로 되돌릴 수 있습니다.']
  },
  9: {
    title: 'Service와 서비스 디스커버리',
    description: 'Service는 Pod 집합에 안정적인 네트워크 엔드포인트를 제공합니다. label selector로 대상 Pod를 찾고, Pod가 교체되어도 Service 주소는 유지됩니다.',
    objectives: ['Service 만들기', 'Service를 Deployment에 연결', '트래픽 흐름 확인'],
    hints: ['Service selector가 Pod label과 일치해야 합니다.', 'Service를 만들고 대상 Deployment를 선택하세요.', '연결선으로 Service -> Pod 라우팅을 확인할 수 있습니다.']
  },
  10: {
    title: 'Ingress: L7 HTTP 라우팅',
    description: 'Ingress는 HTTP 경로와 host 기반으로 외부 트래픽을 Service에 라우팅합니다. TLS termination도 함께 구성할 수 있습니다.',
    objectives: ['Ingress 만들기', '경로 기반 라우팅 구성', 'TLS Secret 연결'],
    hints: ['Ingress는 Service 앞단의 L7 라우터 역할을 합니다.', '/app, /api 같은 path를 각 Service로 라우팅하세요.', 'TLS를 위해 Secret 리소스를 생성하세요.']
  },
  11: {
    title: 'NetworkPolicy: Zero Trust',
    description: 'NetworkPolicy는 Pod 간 허용 트래픽을 명시합니다. 기본 허용 모델에서 필요한 통신만 열어주는 zero-trust 네트워크로 전환할 수 있습니다.',
    objectives: ['NetworkPolicy 만들기', 'database namespace 격리', 'backend -> database만 허용'],
    hints: ['NetworkPolicy가 선택한 Pod는 명시적으로 허용된 트래픽만 받습니다.', 'database namespace에 default deny 정책을 적용하세요.', '필요한 경로만 별도 정책으로 허용하세요.']
  },
  12: {
    title: 'DNS 디버깅',
    description: 'Kubernetes의 Service discovery는 CoreDNS에 크게 의존합니다. DNS가 깨지면 Service 이름으로 서로를 찾지 못합니다.',
    objectives: ['DNS 실패 조사', 'CoreDNS 관련 incident 해결', 'Service discovery 복구'],
    hints: ['kube-system namespace의 CoreDNS 상태를 확인하세요.', 'NetworkPolicy가 DNS egress를 막고 있지 않은지 확인하세요.', 'Service 이름 해석 실패는 app 문제가 아니라 DNS 문제일 수 있습니다.']
  },
  13: {
    title: 'ConfigMap 기본기',
    description: 'ConfigMap은 비밀이 아닌 설정값을 Pod에 주입하는 리소스입니다. 환경 변수나 파일 형태로 앱 설정을 분리할 수 있습니다.',
    objectives: ['ConfigMap 만들기', 'Deployment에 설정 연결', '설정 변경 적용'],
    hints: ['ConfigMap에는 일반 설정값을 넣고 Secret에는 민감 정보를 넣으세요.', 'Pod가 ConfigMap을 환경 변수나 볼륨으로 사용할 수 있습니다.', '설정 변경 후 rollout restart가 필요할 수 있습니다.']
  },
  14: {
    title: 'Secret 운영',
    description: 'Secret은 비밀번호, 토큰, 인증서 같은 민감 데이터를 저장합니다. ConfigMap과 달리 민감 정보 전용으로 사용해야 합니다.',
    objectives: ['Secret 만들기', 'Deployment에 Secret 연결', '민감 정보 노출 방지'],
    hints: ['Secret 값은 base64로 인코딩되지만 암호화와는 다릅니다.', '환경 변수나 volume으로 Pod에 주입할 수 있습니다.', '민감 정보는 ConfigMap에 넣지 마세요.']
  },
  15: {
    title: '영구 스토리지',
    description: 'PV와 PVC는 Pod 생명주기와 분리된 저장소를 제공합니다. Pod가 재시작되어도 데이터가 유지되게 만듭니다.',
    objectives: ['PersistentVolume 만들기', 'PersistentVolumeClaim 만들기', 'Pod에 PVC 연결'],
    hints: ['PVC는 사용자의 스토리지 요청입니다.', 'PV는 실제 제공되는 스토리지입니다.', 'Pod가 삭제되어도 PV의 데이터는 유지될 수 있습니다.']
  },
  16: {
    title: 'StatefulSet 데이터베이스',
    description: 'StatefulSet은 안정적인 Pod 이름과 저장소를 제공해 데이터베이스처럼 상태가 중요한 워크로드에 적합합니다.',
    objectives: ['StatefulSet 만들기', 'PVC 연결', 'replica별 안정적인 identity 확인'],
    hints: ['StatefulSet Pod는 app-0, app-1처럼 안정적인 이름을 가집니다.', 'Headless Service가 StatefulSet DNS에 자주 사용됩니다.', '각 replica는 독립 PVC를 사용할 수 있습니다.']
  },
  17: {
    title: '프로덕션 준비성',
    description: '프로덕션 워크로드에는 probe, resource limit, autoscaling, 가용성 전략이 필요합니다. 단순 실행을 넘어 운영 가능한 상태로 만들어야 합니다.',
    objectives: ['liveness/readiness probe 구성', 'resource request/limit 설정', 'HPA 구성'],
    hints: ['readiness probe는 트래픽을 받을 준비가 되었는지 판단합니다.', 'liveness probe는 죽은 컨테이너를 재시작하게 합니다.', 'request/limit은 스케줄링과 안정성에 중요합니다.']
  },
  18: {
    title: 'RBAC 방어선',
    description: 'RBAC는 누가 어떤 Kubernetes 리소스에 어떤 작업을 할 수 있는지 제한합니다. 최소 권한 원칙을 적용하세요.',
    objectives: ['ServiceAccount 만들기', 'Role과 RoleBinding 구성', 'wildcard 권한 제거'],
    hints: ['Role은 namespace 범위 권한입니다.', 'RoleBinding으로 ServiceAccount에 권한을 부여합니다.', '*, cluster-admin 같은 과도한 권한은 피하세요.']
  },
  19: {
    title: '멀티 노드 장애',
    description: '두 Node가 동시에 다운되는 critical incident입니다. 서비스 가용성을 유지하면서 Node와 Pod를 복구해야 합니다.',
    objectives: ['실패한 Node 2개 복구', '서비스 가용성 80% 유지', 'evict된 Pod 5개 재스케줄', 'PodDisruptionBudget 만들기'],
    hints: ['Node 장애 incident를 조사하고 해결하세요.', 'Node maintenance에는 cordon과 drain이 사용됩니다.', 'PDB는 중단 상황에서 최소 가용성을 보호합니다.']
  },
  20: {
    title: '풀스택 프로덕션',
    description: '최종 챌린지입니다. namespace, workload, service, ingress, network policy, secret, autoscaling까지 포함한 프로덕션급 구성을 처음부터 만듭니다.',
    objectives: ['frontend/backend/data namespace 만들기', '애플리케이션 4개 배포', '모든 Deployment를 Service로 노출', 'Ingress 라우팅 구성', 'NetworkPolicy로 트래픽 분리', 'Secret과 HPA 구성', '모든 Deployment에 probe 추가', 'Architecture 점수 75 이상 달성'],
    hints: ['namespace 3개를 먼저 만들고 각 영역에 Deployment를 배치하세요.', '각 Deployment에 Service를 만들고 Ingress로 외부 라우팅을 구성하세요.', 'NetworkPolicy, Secret, HPA, probe를 추가해 점수를 올리세요.']
  }
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

const CHALLENGES_KO = {
  1: {
    description: 'frontend(nginx), backend(node), database(postgres)로 구성된 3계층 애플리케이션을 배포하고 각각 Service를 붙이세요.',
    objectives: ['frontend 배포', 'backend 배포', 'database 배포', 'Service 3개 만들기', 'frontend가 backend에 연결되게 하기'],
    hints: ['팔레트에서 Deploy를 클릭하고 이름을 frontend로 지정하세요.', 'backend와 database도 같은 방식으로 만드세요.', '각 Deployment마다 Service를 하나씩 만드세요.', '/ 키를 눌러 kubectl create deployment frontend를 입력해도 됩니다.', 'Service는 같은 namespace의 Deployment에 자동 연결됩니다.']
  },
  2: {
    description: '중요한 프로덕션 Pod가 crash loop에 빠졌습니다. 사용자 영향이 커지기 전에 조사하고 복구하세요.',
    objectives: ['크래시 원인 조사', 'CrashLoopBackOff 해결', '클러스터 health 90%로 복구'],
    hints: ['/ 키를 눌러 kubectl describe pod payment-service를 실행하세요.', 'Events 섹션에서 크래시 원인을 찾으세요.', 'kubectl logs로 컨테이너 출력을 확인하세요.', 'kubectl rollout restart deployment payment-service로 재시작할 수 있습니다.']
  },
  3: {
    description: 'TLS termination이 있는 Ingress를 구성하고 /app, /api 경로를 각각 올바른 Service로 라우팅하세요.',
    objectives: ['Ingress 만들기', '/app과 /api 라우팅', 'TLS 활성화', 'TLS Secret 만들기'],
    hints: ['Ingress를 만들고 /app, /api route를 구성하세요.', 'TLS termination을 위해 kubernetes.io/tls 타입 Secret을 만드세요.', 'Ingress는 기존 app-svc와 api-svc Service에 연결됩니다.']
  },
  4: {
    description: 'zero-trust 네트워킹을 구현하세요. namespace를 격리하고 필요한 트래픽만 허용해야 합니다.',
    objectives: ['NetworkPolicy 3개 만들기', 'database namespace 격리', 'backend -> database 허용', 'frontend -> database 차단'],
    hints: ['database namespace에 기본 deny 정책을 만드세요.', 'app=api label을 가진 Pod에서 오는 ingress만 허용하세요.', 'frontend에서 database로 가는 트래픽은 차단되어야 합니다.']
  },
  5: {
    description: '트래픽이 급증했습니다. 고객이 이탈하기 전에 애플리케이션을 빠르게 확장하세요.',
    objectives: ['web을 replica 10개로 확장', 'api를 replica 8개로 확장', 'HPA 2개 만들기', 'Node 5개 확보'],
    hints: ['kubectl scale deployment web --replicas=10을 실행하세요.', 'kubectl scale deployment api --replicas=8도 실행하세요.', 'HPA를 만들어 자동 확장을 켜세요.', 'Pod가 Pending이면 Node를 더 추가하세요.']
  },
  6: {
    description: 'Node 장애로 여러 Pod가 함께 사라졌습니다. 클러스터를 복구하고 workload가 다시 스케줄되게 하세요.',
    objectives: ['실패한 Node 복구', 'evict된 Pod 3개 재스케줄', 'health 85%로 복구', 'PodDisruptionBudget 만들기'],
    hints: ['kubectl uncordon node-2로 Node를 복구하세요.', '실패한 Node의 Pod는 scheduler가 다시 배치합니다.', '향후 중단을 줄이려면 PDB를 만드세요.']
  },
  7: {
    description: '영구 스토리지와 headless Service를 갖춘 replica 3개의 StatefulSet 데이터베이스를 배포하세요.',
    objectives: ['StatefulSet 만들기', 'replica 3개로 확장', 'PVC 3개 만들기', 'headless Service 만들기', 'PV 3개 만들기'],
    hints: ['StatefulSet은 안정적인 Pod identity를 유지합니다.', 'kubectl scale statefulset <name> --replicas=3으로 확장하세요.', '각 replica에 PVC가 필요합니다.', 'headless Service는 clusterIP: None을 사용합니다.', 'PVC를 뒷받침할 PV도 만들어야 합니다.']
  },
  8: {
    description: '전용 ServiceAccount, 최소 권한 Role, RoleBinding으로 올바른 RBAC를 구현하세요.',
    objectives: ['ServiceAccount 2개 만들기', 'Role 2개 만들기', 'RoleBinding 2개 만들기', 'wildcard 권한 제거', 'UnauthorizedAccess 해결'],
    hints: ['워크로드마다 필요한 identity를 따로 만드세요.', 'Role은 구체적인 권한만 가져야 합니다.', 'RoleBinding으로 Role을 ServiceAccount에 연결하세요.', '기존 overprivileged-sa의 과도한 권한을 최소 권한으로 바꾸세요.']
  },
  9: {
    description: 'CoreDNS가 다운되어 Service discovery가 실패하고 있습니다. DNS 인프라를 진단하고 복구하세요.',
    objectives: ['DNS 실패 조사', 'DNS resolution 복구', 'NetworkPolicy에서 DNS egress 허용'],
    hints: ['strict-deny NetworkPolicy가 DNS를 막고 있습니다.', 'kube-dns 53번 포트로 egress를 허용하는 NetworkPolicy를 만드세요.', 'kubectl describe로 기존 NetworkPolicy rule을 확인하세요.']
  },
  10: {
    description: '10분 안에 namespace, app, service, ingress, network policy, secret, HPA, probe를 갖춘 프로덕션급 클러스터를 만드세요.',
    objectives: ['namespace 3개 만들기', '애플리케이션 3개 배포', 'Service로 노출', 'Ingress 구성', '네트워크 분리', 'credential을 Secret에 저장', 'autoscaling 구성', 'health probe 추가', 'Architecture 점수 70 이상'],
    hints: ['frontend, backend, database 같은 namespace 3개를 만드세요.', 'namespace마다 애플리케이션을 하나씩 배포하세요.', 'Service와 Ingress로 외부 접근 경로를 만드세요.', 'NetworkPolicy로 namespace 간 트래픽을 분리하세요.', 'Secret과 HPA를 구성하세요.', 'Deployment에 liveness/readiness probe를 추가하세요.']
  }
};

const TEXT_REPLACEMENTS = {
  'Settings': '설정',
  'Achievements': '업적',
  'Stats': '통계',
  'Total Pods': '전체 Pod',
  'Incidents Resolved': '해결한 Incident',
  'Commands Run': '실행한 명령',
  'Time Played': '플레이 시간',
  'Campaign Stars': '캠페인 별',
  'Best Chaos Time': '최고 카오스 기록',
  'XP Level': 'XP 레벨',
  'Keep playing to unlock': '계속 플레이하면 해금됩니다',
  'No resources to export': '내보낼 리소스가 없습니다',
  'Auto-Align': '자동 정렬',
  'Reset View': '화면 초기화',
  'Help': '도움말',
  'Workloads': 'Workload',
  'Network': '네트워크',
  'Config': '설정',
  'Storage': '스토리지',
  'Cluster': '클러스터',
  'Security': '보안',
  'Share': '공유',
  'Clear': '초기화',
  'Draw Line': '연결선',
  'Auto-Layout': '자동 배치'
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
      const ko = CHALLENGES_KO[challenge.id];
      if (!ko) return;
      if (ko.description) challenge.description = ko.description;
      if (ko.objectives && Array.isArray(challenge.objectives)) {
        challenge.objectives.forEach((objective, index) => {
          if (ko.objectives[index]) objective.label = ko.objectives[index];
        });
      }
      if (ko.hints) challenge.hints = ko.hints;
    });
  }

  if (Array.isArray(ACHIEVEMENTS)) {
    ACHIEVEMENTS.forEach((achievement) => {
      if (achievement.name === 'First Steps') achievement.name = '첫걸음';
      if (achievement.name === 'Pod Master') achievement.name = 'Pod 마스터';
      if (achievement.name === 'Incident Commander') achievement.name = 'Incident Commander';
    });
  }

  installTextReplacementObserver();

  window.K8S_GAMES_KO = {
    unofficial: true,
    notice: '비공식 한국어 배포판입니다. 원본 K8s Games는 Rohit Ghumare가 Apache-2.0으로 배포했습니다.'
  };
}

function installTextReplacementObserver() {
  const replace = (root = document.body) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const pending = [];
    while (walker.nextNode()) pending.push(walker.currentNode);
    for (const node of pending) {
      const text = node.nodeValue;
      const trimmed = text.trim();
      if (!trimmed || !TEXT_REPLACEMENTS[trimmed]) continue;
      node.nodeValue = text.replace(trimmed, TEXT_REPLACEMENTS[trimmed]);
    }
    root.querySelectorAll?.('[title]').forEach((el) => {
      const title = el.getAttribute('title');
      if (TEXT_REPLACEMENTS[title]) el.setAttribute('title', TEXT_REPLACEMENTS[title]);
    });
  };

  replace();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) replace(node);
        else if (node.nodeType === Node.TEXT_NODE) {
          const trimmed = node.nodeValue.trim();
          if (TEXT_REPLACEMENTS[trimmed]) {
            node.nodeValue = node.nodeValue.replace(trimmed, TEXT_REPLACEMENTS[trimmed]);
          }
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
