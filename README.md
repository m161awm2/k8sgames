# K8s게임 한국어 패치버전

Kubernetes를 게임처럼 배울 수 있는 **K8s Games**의 비공식 한국어 패치버전입니다. Pod를 배포하고, CrashLoopBackOff 같은 장애를 진단하고, 실제와 비슷한 `kubectl` 명령을 입력하면서 클러스터 운영 감각을 익힐 수 있습니다.

> 이 저장소는 공식 K8s Games가 아닙니다. 원작자의 Apache-2.0 라이선스 프로젝트를 기반으로 한국어 번역과 배포 편의 패치를 더한 비공식 배포판입니다.

## 바로 실행

- 한국어 패치버전: https://linux.m161awm.kr/k8sgames/
- K8s Draw 한국어판: https://linux.m161awm.kr/k8sgames/draw.html
- 원작자 저장소: https://github.com/rohitg00/k8sgames
- 번역자 GitHub: https://github.com/m161awm2

![K8s Games - 3D Kubernetes cluster simulation in the browser](screenshot.png)

## 로컬 실행

별도 빌드가 필요 없는 정적 웹앱입니다.

```bash
git clone https://github.com/m161awm2/k8sgames.git
cd k8sgames
git switch korean-distribution
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 열면 됩니다.

## 한글화 범위

- 메인 메뉴와 주요 버튼
- 캠페인 챕터명
- 캠페인 레벨 제목 전체
- 초반 캠페인 설명, 목표, 힌트
- 챌린지 제목
- K8s Draw 상단 도구막대 일부
- 한국어 폰트 및 GitHub Pages 경로 패치

`Pod`, `Deployment`, `CrashLoopBackOff`, `kubectl` 출력 같은 Kubernetes 고유 용어와 명령어는 학습 효과를 위해 상당 부분 원문을 유지합니다.

## 게임 모드

| 모드 | 설명 |
|------|------|
| 캠페인 | 5개 챕터, 20개 레벨로 Kubernetes 기본부터 프로덕션 운영까지 학습 |
| 카오스 모드 | 점점 강해지는 장애를 버티는 생존형 SRE 훈련 |
| 샌드박스 | 자유롭게 클러스터를 설계하고 아키텍처 점수를 확인 |
| 챌린지 | 시간 제한 시나리오에서 앱 배포와 장애 복구 수행 |

## K8s Draw

Kubernetes 아키텍처를 3D로 그리는 다이어그램 도구입니다.

- K8s 리소스를 3D 캔버스에 배치
- 리소스 간 연결선 작성
- 리소스 이름, namespace, label, replica 편집
- YAML 또는 PNG로 내보내기
- URL로 다이어그램 공유

## 조작법

| 입력 | 동작 |
|------|------|
| `/` | kubectl 명령창 열기 |
| `?` | 도움말 |
| `Space` | 일시정지 / 재개 |
| `M` | 메트릭 대시보드 |
| `Esc` | 메뉴로 돌아가기 |
| `1-9` | 리소스 빠른 선택 |
| 왼쪽 클릭 | 리소스 선택 |
| 오른쪽 클릭 | 컨텍스트 메뉴 |
| 스크롤 | 확대 / 축소 |

## 출처와 라이선스

- 원작자: Rohit Ghumare
- 원본 저장소: https://github.com/rohitg00/k8sgames
- 한국어 번역/패치: https://github.com/m161awm2
- 라이선스: Apache License 2.0

Apache-2.0 라이선스 전문은 `LICENSE` 파일에 포함되어 있습니다. 한국어 배포판 변경 고지는 `NOTICE-KO.md`를 참고하세요.
