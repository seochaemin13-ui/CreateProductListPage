# ElevSafe A-D WebSocket JSON 데이터 포맷 합의 정리

- 작성일: 2026-10-01
- 대상 역할
  - A: Backend & System Integration
  - D: Frontend & Demo Integration
- 목적: Backend에서 Frontend로 전달하는 실시간 승객 상태 및 엘리베이터 제어 정보를 동일한 변수명, 좌표계, 상태값 기준으로 통일

---

## 1. 기본 통신 방향

Frontend는 WebSocket 또는 API를 통해 Backend가 전달하는 JSON 데이터를 수신하여 2D 엘리베이터 평면도 위에 승객 상태를 렌더링합니다.

기본 데이터 흐름은 다음과 같습니다.

```text
Backend
  ↓
WebSocket / API
  ↓
JSON
  ↓
Frontend
  ↓
2D Elevator Dashboard
```

Frontend UI는 3D가 아니라 2D 평면도 기반이며, 승객을 점 형태로 표시합니다.

---

## 2. 공통 공간 좌표계

2026-10-01 회의에서 결정된 좌표계를 A, B, D가 공통 기준으로 사용합니다.

### 원점

```text
(0, 0, 0)
= 엘리베이터 문턱 정중앙의 바닥
```

### X축: 좌우

엘리베이터 카빈 내부에서 문 쪽을 바라보는 기준입니다.

```text
왼쪽  : 양수 (+)
오른쪽: 음수 (-)
```

### Y축: 전후

문턱을 `Y = 0`으로 둡니다.

```text
승강장 대기 구역: 음수 (-)
카빈 내부      : 양수 (+)
```

### Z축: 상하

```text
바닥: 0
위쪽: 양수 (+)
```

### 좌표 단위

Backend에서 Frontend로 전달하는 좌표 단위는 **m**로 통일합니다.

Frontend는 필요할 경우 다음과 같이 변환합니다.

```text
m × 100 = cm
cm → 화면 비율에 맞춰 px 변환
```

Frontend는 현재 2D 평면도에서 `x`, `y`만 사용하므로 WebSocket JSON에는 `z`를 전달하지 않습니다.

단, `z` 값은 Backend 및 향후 상태 판별 과정에서는 내부적으로 유지할 수 있습니다.

---

## 3. 승객 상태 분류

승객 상태는 **이동 상태**와 **이상 상태**를 분리하여 표현합니다.

### 이동 상태: `state`

허용 값:

```text
ENTERING
INSIDE
EXITING
```

의미:

| 값 | 의미 |
|---|---|
| `ENTERING` | 승강장에서 엘리베이터로 입장 중 |
| `INSIDE` | 엘리베이터 내부 탑승 상태 |
| `EXITING` | 엘리베이터에서 퇴장 중 |

Frontend에서는 위 세 상태를 정상 계열로 표시합니다.

별도의 `NORMAL` 상태는 사용하지 않습니다.

### 이상 상태: `safety_state`

허용 값:

```text
null
FALL
IMMOBILE
```

의미:

| 값 | 의미 |
|---|---|
| `null` | 현재 이상 상태 없음 |
| `FALL` | 낙상 발생 |
| `IMMOBILE` | 장시간 미동 없음 |

Frontend에서는 `FALL`, `IMMOBILE`을 위험 상태로 표시합니다.

현재 UI 기준:

```text
state = ENTERING / INSIDE / EXITING
→ 초록색

safety_state = FALL / IMMOBILE
→ 빨간색
→ UI 최상단 경고 깜빡임
```

### 상태를 분리하는 이유

`state` 하나에 `ENTERING / INSIDE / EXITING / FALL / IMMOBILE`을 모두 넣으면 이상 상태 발생 시 기존 이동 상태 정보가 사라집니다.

예를 들어 내부 탑승 중 낙상이 발생한 경우 아래와 같이 두 정보를 동시에 유지합니다.

```json
{
  "state": "INSIDE",
  "safety_state": "FALL"
}
```

정상적인 내부 승객은 다음과 같습니다.

```json
{
  "state": "INSIDE",
  "safety_state": null
}
```

---

## 4. JSON 기본 구조

현재 합의된 A-D JSON 구조는 다음 형태를 기준으로 합니다.

```json
{
  "timestamp": "2026-10-01T14:02:05Z",
  "door_status": "DOOR_HOLD",
  "passengers": [
    {
      "id": 1,
      "x": -0.20,
      "y": 1.00,
      "state": "INSIDE",
      "safety_state": null,
      "label": "Passenger #1"
    },
    {
      "id": 2,
      "x": 0.15,
      "y": -0.60,
      "state": "ENTERING",
      "safety_state": "FALL",
      "label": "Passenger #2"
    }
  ]
}
```

위 예시의 `x`, `y` 단위는 **m**입니다.

---

## 5. JSON 필드 정의

### 최상위 필드

| 변수명 | 타입 | 의미 |
|---|---|---|
| `timestamp` | String | 데이터 측정 또는 생성 시각 |
| `door_status` | String | 현재 문 제어 상태 |
| `passengers` | Array | 현재 전달할 승객 객체 목록 |

### `door_status` 허용 값

```text
DOOR_OPEN
DOOR_HOLD
DOOR_CLOSE
```

### `passengers` 내부 필드

| 변수명 | 타입 | 의미 | 비고 |
|---|---|---|---|
| `id` | Number | 승객 추적용 고유 식별자 | 최종 Tracking ID 사용 예정 |
| `x` | Number | 공통 좌표계 X 위치 | 단위 m |
| `y` | Number | 공통 좌표계 Y 위치 | 단위 m |
| `state` | String | 승객 이동 상태 | `ENTERING`, `INSIDE`, `EXITING` |
| `safety_state` | String 또는 null | 이상 상태 | `FALL`, `IMMOBILE`, `null` |
| `label` | String | UI 툴팁 표시용 이름 | 생략 시 Frontend에서 생성 가능 |

---

## 6. 승객 ID 기준

Frontend의 `id`는 레이더 원시 `targetId`를 그대로 사용하는 값으로 고정하지 않습니다.

최종적으로는 C의 Tracking 단계에서 관리되는 승객 ID를 Backend가 전달하는 방향을 기준으로 합니다.

```text
Radar raw targetId
    ↓
Tracking / ID Management
    ↓
Passenger ID
    ↓
JSON id
```

C의 Tracking 인터페이스가 구체화되면 실제 ID 타입과 생성 방식을 최종 맞춥니다.

---

## 7. Frontend 렌더링 기준

Frontend는 2D 엘리베이터 평면도 위에 승객을 점 형태로 렌더링합니다.

기본 렌더링 기준:

```text
x, y
→ 승객 위치

state
→ 정상 이동 상태 표시

safety_state
→ 위험 상태 우선 표시

id / label
→ 툴팁 또는 객체 식별
```

### 예시

정상 탑승:

```json
{
  "id": 1,
  "x": -0.20,
  "y": 1.00,
  "state": "INSIDE",
  "safety_state": null
}
```

탑승 중 낙상:

```json
{
  "id": 1,
  "x": -0.20,
  "y": 1.00,
  "state": "INSIDE",
  "safety_state": "FALL"
}
```

승차 중 낙상:

```json
{
  "id": 2,
  "x": 0.15,
  "y": -0.60,
  "state": "ENTERING",
  "safety_state": "FALL"
}
```

이 구조를 통해 이상 상태가 발생해도 기존 이동 상태를 유지할 수 있습니다.

---

## 8. Z 좌표 처리

공통 좌표계에는 Z축이 존재하지만, 현재 Frontend UI는 2D 평면도이므로 WebSocket JSON에서는 `z`를 사용하지 않습니다.

```text
Backend / Algorithm 내부
x, y, z 유지 가능

A → D WebSocket JSON
x, y 전달
z 생략
```

추후 3D 시각화나 높이 정보 표시가 필요해질 경우 `z` 필드 추가를 다시 검토할 수 있습니다.

---

## 9. 좌표 데이터 처리 시 주의사항

공통 좌표계의 원점은 **엘리베이터 문턱 정중앙 바닥**입니다.

따라서 Retina 센서에서 수신한 원시 `x`, `y`, `z`가 자동으로 이 공통 좌표계와 동일하다고 가정하지 않습니다.

실제 센서 설치 위치와 방향에 따라 필요한 경우 다음 변환 과정이 필요할 수 있습니다.

```text
Retina Sensor Coordinate
        ↓
설치 위치 / 방향 기준 좌표 변환
        ↓
ElevSafe Common Coordinate
        ↓
B / C Processing
        ↓
Backend Result
        ↓
Frontend
```

좌표 변환 파라미터와 실제 적용 위치는 센서 설치 및 B의 ROI 구현 상황과 함께 별도로 확정합니다.

---

## 10. 현재 확정 사항 요약

```text
[확정] 공통 좌표계 원점
        문턱 정중앙 바닥

[확정] X축
        왼쪽(-), 오른쪽(+)

[확정] Y축
        승강장(-), 카빈(+)

[확정] Z축
        바닥 0, 위쪽(+)

[확정] Backend → Frontend 좌표 단위
        m

[확정] Frontend UI
        2D 평면도

[확정] WebSocket 좌표
        x, y 사용
        z 미전송

[확정] state
        ENTERING / INSIDE / EXITING

[확정] safety_state
        null / FALL / IMMOBILE

[확정] NORMAL
        별도 상태로 사용하지 않음

[확정] door_status
        DOOR_OPEN / DOOR_HOLD / DOOR_CLOSE

[확정] passengers 기본 필드
        id / x / y / state / safety_state / label

[확정] label
        Backend에서 생략 가능
        생략 시 Frontend에서 생성 가능

[현재 기준] id
            raw targetId가 아니라 Tracking에서 관리되는 승객 ID 사용 예정
```

---

## 11. 추후 연동 시 확인할 사항

현재 A-D 포맷의 핵심 구조는 합의되었습니다.

다음 항목은 실제 B/C 모듈 연동 과정에서 추가로 확인합니다.

```text
1. C Tracking ID의 실제 타입 및 생성 방식
2. Sensor Coordinate → Elevator Common Coordinate 변환 방식
3. B ROI와 공통 좌표계의 실제 적용 방식
4. timestamp 생성 주체와 세부 포맷 확정
5. 향후 Frontend 요구사항 변경 시 추가 필드 여부
```

기존 변수명이나 데이터 구조를 변경해야 하는 경우 각 담당자가 임의로 변경하지 않고 먼저 공유한 뒤 통일합니다.

---

## 12. 최종 데이터 예시

```json
{
  "timestamp": "2026-10-01T14:02:05Z",
  "door_status": "DOOR_HOLD",
  "passengers": [
    {
      "id": 1,
      "x": -0.20,
      "y": 1.00,
      "state": "INSIDE",
      "safety_state": null,
      "label": "Passenger #1"
    },
    {
      "id": 2,
      "x": 0.15,
      "y": -0.60,
      "state": "ENTERING",
      "safety_state": "FALL",
      "label": "Passenger #2"
    }
  ]
}
```
