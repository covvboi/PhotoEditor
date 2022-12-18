#  Photo Editor

> PhotoEditor는 사용자가 사진의 기본적인 편집을 웹페이지에서 좀 더 편하게 작업할 수 있도록 만들었습니다.

[사용하기](https://covvboi.github.io/PhotoEditor/)

## 제공된 기능🛠️

### 1. 사진 자르기 ✂️ 
 >아래사진과 같이 자르고싶은 범위를 설정해서 자를수 있습니다. 
<img width="30%" align="left" alt="자르기 범위설정" src="https://user-images.githubusercontent.com/89898165/208283921-e84cf762-b6d1-436e-ad72-ee874762e26b.png"> 

<img width="30%" align="center" alt="자르기 완료" src="https://user-images.githubusercontent.com/89898165/208283969-f55f4069-c152-4df9-98e2-df2b9565bb38.png"> 

<hr>

### 2. 이미지 회전 🔄 
> 사진과 같이 좌,우 방향중 원하는 방향을 사진을 회전시킬수 있습니다.
<img width="30%" align="left" alt="오른쪽회전" src="https://user-images.githubusercontent.com/89898165/208284269-497fe926-2a26-42e4-a193-7847be16576e.png">

<img width="30%" align="center" alt="왼쪽회전" src="https://user-images.githubusercontent.com/89898165/208284295-4bb82bd1-8e40-4d4b-9ece-a0efbc8d3117.png">  

<hr>

### 3. 이미지 좌우 및 상하 반전 🔃  
> 아래 구현된 사진과 같이 좌우 및 상하 반전을 시킬수있습니다.
<img width="30%" align="left" alt="좌-우반전" src="https://user-images.githubusercontent.com/89898165/208284847-d24e6c11-92e4-44fc-8f4c-deea925dde9a.png">

<img width="30%"  align="center" alt="상-하 반전" src="https://user-images.githubusercontent.com/89898165/208284858-cac19082-7a29-4c6a-b3d1-0414bc24f482.png">

<hr>

### 4. 이미지 필터 적용 🌉  
> 제공된 필터는 총 6가지로 원하는 필터르 사진에 적용시킬수 있습니다.<br>

- Brightness(밝은)

<img width="30%" alt="brightness" src="https://user-images.githubusercontent.com/89898165/208284893-d5751812-394f-475a-8a0f-4ea5315954bd.png">

- Grayscale(어두운)

<img width="30%" alt="greyscale" src="https://user-images.githubusercontent.com/89898165/208284898-d747be19-0547-42e3-ad5f-a26c71ca2160.png">

- Sepia(빛바랜)

<img width="30%" alt="sepia" src="https://user-images.githubusercontent.com/89898165/208284903-d991ebce-a761-4ca6-8a49-6c390243f2d9.png">

- Saturate(선명한)

<img width="30%" alt="saturate" src="https://user-images.githubusercontent.com/89898165/208284911-563bc8d1-7895-46d6-8a9d-66182b4f067b.png">

- Contrast(대비된)

<img width="30%" alt="contrast" src="https://user-images.githubusercontent.com/89898165/208284922-36a6ca46-f423-4ac9-88b6-58d44866a065.png">

- Huerotate(색전환)

<img width="30%" alt="huerotate" src="https://user-images.githubusercontent.com/89898165/208284935-3653f859-ce52-47bd-b526-4d5552a205a8.png">



##  1. 구현화면 💻



<img width="60%" src="https://user-images.githubusercontent.com/89898165/207321038-4304b2a5-d31f-44fa-a66c-09c64cdc0baf.gif"/>

##  2. 사용기술 🚀
- HTML
- CSS
- JavaScript
- React
- Redux-Toolkit

##  3. 프로젝트 소개 

> 평소 컴퓨터로 가벼운 사진편집을 자주하는데, 그럴때 기본적인 편집을 좀 더 편하고 빠르게 하기위해 만들어진 편집기입니다. 
> 전반적으로 Canvas API를 기반으로 구현하였고, 이미지 관리에 많이 사용되는 외부 라이브러리를 최소화했으며, 그 이외 프레임워크는 React를 사용하였습니다.
> 추가로 React의 상태 관리는 Redux-Toolkit을 사용하였으며, 크기가 다른 사진들도 모두 대응할 수 있게 로직을 작성하였습니다.

##  4. 구현 기술설명

### 1. Crop Funtion ✂️
<img width="30%" src="https://user-images.githubusercontent.com/89898165/208039551-5229c0bf-3c63-4e86-962c-8f5542eb188b.jpeg"/>

- Crop Layer - 이미지를 자르고싶은 범위를 지정할 수 있는 Layer<br> 
- Image Layer - 불러온 이미지를 화면에 노출시켜주는 Layer

이미지의 범위를 지정할 수 있게 사각형을 마우스에 따라 canvas 위에 그려주기 위해서는 마우스의 흔적을 초기화 시켜줘야하는데, canvas특성상 특정 값을 지울 수 없고 모두 초기화된다.
그래서 이 점을 해결하기 위해 사진을 보여주는 Layer와 CropLayer를 중첩으로 사용했습니다.

<hr>

### 2. Rotate Funtion 🔄

<img width="30%" align="left" src="https://user-images.githubusercontent.com/89898165/208043810-25cd582c-00f4-4b2c-a65e-cfa66bf3e535.jpeg"/>


<img width="30.6%"  align="center" src="https://user-images.githubusercontent.com/89898165/208044782-f208d9da-0e12-43ee-a69c-5f50ee207631.jpeg"/>

canvas에서 회전을 할때는 위의 사진처럼 원점(0,0)을 기준으로 회전을 하기때문에 사용자가 보는 화면에서 이미지가 벗어날 수 있습니다.<br>
때문에 회전을 하고 다시 가운데로 이동을 시켜주는 작업을 따로 했습니다.




