<div align="center">
</div>

<br>  

## 📰 프로젝트 소개

IoT와 유니티로 체험하는 소방 훈련 시뮬레이션 웹 <Br> <br>
불속에서 살아남기는 소방 안전 교육을 목표로 하는 화재 상황 시뮬레이션 웹입니다. <br> 소화기를 IoT로 제작하여 교육 대상자가 소화기 사용법을 익힐 수 있습니다. 또한, 웹캠으로 사용자의 움직임을 분석하여 화재 상황에서 출구를 찾아 대피할 수 있도록 합니다. 더 많은 사람이 올바른 소방 훈련을 받을 수 있게 하는 것이 프로젝트의 목표입니다.

<br> 

개발 기간 : `23.10.10 ~ 23.11.17`

<br>  

## 💡 주요 기능

### IoT

소화기 컨트롤러는 마이크로 보드에 MPU6050 가속도 센서 연결해서 X,Y 좌표값 기반으로 마우스 움직입니다.

<table>
 <tr align="center">
   <th colspan="2">소화기 컨트롤러</th>
 </tr>
 <tr align = "center">
  <td>
   <img src="https://github.com/hanb613/BullsOneShot/assets/60910288/add42478-d922-44c8-af37-5eab57c16e14">
  </td>
  <td>
   <img src="https://github.com/hanb613/BullsOneShot/assets/60910288/ce67c9ec-6277-48ad-b740-1cc798091727"
  </td>
 </tr>
</table>


https://github.com/hanb613/BullsOneShot/assets/60910288/2815fa87-a60d-4dab-bf6e-dc4ed719082d


<br>  
<br>   

비상벨은 ESP8266이 결합된 NodeMCU 보드에 led와 택트 스위치(Tact switch)를 연결하여 만들었습니다.
여기서 버튼을 누르면 ESP8266을 통해 http 요청이 발생합니다.

<img src="https://github.com/hanb613/BullsOneShot/assets/60910288/c813946f-a674-48c6-97d7-99eec4a400e5" width="700">


<br>
<br>   

### 동작 인식 모델

웹캠을 통한 동작 인식은 TensorFlow와 Teachable Machine, PoseNet을 사용하였습니다. <br>
몸을 구부리는 동작은 데이터셋 7000장을 제작해 모델을 학습시켜 사용하였고, <br>
사람이 걷고 있다는 것은 PoseNet을 사용해 인체 포인트를 감지하고, 이를 코사인 법칙으로 계산해 추정하고 있습니다. <br>

<img src="https://github.com/hanb613/BullsOneShot/assets/60910288/3f457f2e-2233-4e24-8734-48cfa7244d4e" width="700">

<br>  
<br>  


## 💻 실행 화면

|로그인 화면|메인 홈 화면|
| --- | --- |
|![로그인화면](https://github.com/hanb613/BullsOneShot/assets/60910288/2af50671-4a05-4303-b2b5-de0514fcd18f)|![홈화면](https://github.com/hanb613/BullsOneShot/assets/60910288/db7a5492-5016-403d-bd79-97ae7ddc2c09)|

|시뮬레이션 시작 화면|
| --- | 
|![시뮬레이션 화면-min](https://github.com/hanb613/BullsOneShot/assets/60910288/47caaeef-0b22-4323-a9f3-2e0f79555057)|

|소화기 선택 및 소화|잘못된 대피 방법시 훈련 종료|
| --- | --- |
|![소화기 선택 및 소화 gif](https://github.com/hanb613/BullsOneShot/assets/60910288/f05b6fd3-730c-4859-be67-89ba230239f4)|![안쪼그리면주겨요 gif](https://github.com/hanb613/BullsOneShot/assets/60910288/82f7d39d-3ba7-4b69-9c79-1c76d773b0fb)|

|튜토리얼 - 학교 환경|튜토리얼 - SSAFY 환경|
| --- | --- |
|![튜토리얼학교환경](https://github.com/hanb613/BullsOneShot/assets/60910288/cd35b1d1-37d8-48b0-9e61-fee3bb5a19f7)|![SSAFY-min-ezgif com-optimize](https://github.com/hanb613/BullsOneShot/assets/60910288/e06abdbc-fd81-4369-a625-0e994c01d5da)|

|수료증 화면|수료증 다운로드 화면|
| --- | --- |
|![수료증화면](https://github.com/hanb613/BullsOneShot/assets/60910288/e4ac117f-32cd-4624-8501-6cf10bf2ca65)|![수료증 다운로드 화면](https://github.com/hanb613/BullsOneShot/assets/60910288/0fd086ef-cb66-4a28-a1ae-880cefcc2d84)|



<br>  


## ⚙️ 기술 스택

### Frontend
<div>
<img src="https://img.shields.io/badge/Unity-000000?style=for-the-badge&logo=Unity&logoColor=white">
<img src="https://img.shields.io/badge/C%23-512BD4?style=for-the-badge&logo=C%23&logoColor=white"> <br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React-Query&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindCSS&logoColor=white">
<img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

</div>

### **Backend**
<div>
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/jpa-6DB33F?style=for-the-badge&logo=javapersistenceapi&logoColor=white">
<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
</div>

### **Infra**
<div>
<img src="https://img.shields.io/badge/amazon AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/amazon EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
</div>

### **Cooperation**
<div>
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
<img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
<img src="https://img.shields.io/badge/Gerrit-EEEEEE?style=for-the-badge&logo=Gerrit&logoColor=black">
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">
</div>  <br>  

<br>  

  
## 📄 아키텍처 설계도

<img src="https://github.com/hanb613/BullsOneShot/assets/60910288/f99debb3-b816-49bd-84c8-e9e11ad8391b" width="600px"/>  <br>  



<br>  



## ✨ 팀원 소개
<table>
 <tr align="center">
   <th colspan="3">Front-End</th>
   <th colspan="3">Back-End</th>
 </tr>
 <tr align = "center">
  <td>
   김은하
  </td>
  <td>
   박민아
  </td>
  <td>
   정재욱
  </td>
    <td>
   김유정
  </td>
    <td>
   유영서
  </td>
  </td>
    <td>
   진희솜
  </td>
 </tr>
</table>
