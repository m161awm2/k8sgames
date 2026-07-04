# K8s Games 한국어 배포판

Kubernetes를 게임처럼 배울 수 있는 **K8s Games**의 비공식 한국어 배포판입니다. Pod를 배포하고, CrashLoopBackOff 같은 장애를 진단하고, 실제와 비슷한 `kubectl` 명령을 입력하며 클러스터 운영 감각을 익힐 수 있습니다.

> 이 배포판은 원본 프로젝트의 공식 배포가 아닙니다. 원본은 [rohitg00/k8sgames](https://github.com/rohitg00/k8sgames)이며 Apache-2.0 라이선스로 배포됩니다.

## 실행하기

```bash
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080`을 엽니다.

## 한글화 범위

- 메인 메뉴, 일부 HUD/도움말 문구
- 캠페인 챕터명
- 캠페인 레벨 제목 전체
- 초반 캠페인 설명/목표/힌트
- 챌린지 제목
- K8s Draw 상단 도구막대 일부

`Pod`, `Deployment`, `CrashLoopBackOff`, `kubectl` 출력 같은 Kubernetes 고유 용어와 명령어는 학습 효과를 위해 대부분 원문을 유지합니다.

## 라이선스와 고지

이 배포판은 원본의 Apache-2.0 라이선스를 따릅니다.

- `LICENSE` 파일을 유지해야 합니다.
- 원본 저작권 및 출처 표기를 유지해야 합니다.
- 수정된 파일에는 변경 사실을 표시해야 합니다.
- 이 배포판을 공식 K8s Games처럼 오인하게 만들면 안 됩니다.

자세한 변경 고지는 `NOTICE-KO.md`를 참고하세요.
