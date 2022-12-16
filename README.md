#  Photo Editor

> PhotoEditor는 라이브러리를 사용하지 않고 JavaScript와 HTML의 핵심 기능을 살려 구현해본 저의 Frontend 프로젝트입니다.

##  1. 구현화면 💻

[직접 구현하기](https://covvboi.github.io/PhotoEditor/)

<img width="60%" src="https://user-images.githubusercontent.com/89898165/207321038-4304b2a5-d31f-44fa-a66c-09c64cdc0baf.gif"/>

##  2. 사용기술 🚀
- HTML
- CSS
- JavaScript
- React
- Redux-Toolkit

##  3. 프로젝트 소개 

> Frontend 개발 실력을 올리기 위해 (필터, 사진 회전, 좌우 및 상하 반전, 사진 자르기, 이미지 저장)등의 기본적인 기능을 구현할 수 있는 이미지 편집기를 만들어 보았습니다.
>
> 우선 Canvas API를 기반으로 구현하였고, 전반적으로 이미지 관리에 많이 사용하는 라이브러리를 사용하지 않고 기능들을 완성했습니다. 그 이외 React의 상태 관리는 Redux-Toolkit을 사용하였으며, 크기가 다른 사진들도 모두 대응할 수 있게 로직을 작성하였습니다.

## Crop Funtion ✂️
<img width="30%" src="https://user-images.githubusercontent.com/89898165/208039551-5229c0bf-3c63-4e86-962c-8f5542eb188b.jpeg"/>

- Crop Layer - 이미지를 자르고싶은 범위를 지정할 수 있는 Layer<br> 
- Image Layer - 불러온 이미지를 화면에 노출시켜주는 Layer

이미지의 범위를 지정할 수 있게 사각형을 마우스에 따라 canvas 위에 그려주기 위해서는 마우스의 흔적을 초기화 시켜줘야하는데, canvas특성상 특정 값을 지울 수 없고 모두 초기화된다.
그래서 이 점을 해결하기 위해 사진을 보여주는 Layer와 CropLayer를 중첩으로 사용했습니다.

## Rotate Funtion 🔄

<img width="30%" align="left" src="https://user-images.githubusercontent.com/89898165/208043810-25cd582c-00f4-4b2c-a65e-cfa66bf3e535.jpeg"/>


<img width="30.6%"  align="center" src="https://user-images.githubusercontent.com/89898165/208044782-f208d9da-0e12-43ee-a69c-5f50ee207631.jpeg"/>

canvas에서 회전을 할때는 위의 사진처럼 원점(0,0)을 기준으로 회전을 하기때문에 사용자가 보는 화면에서 이미지가 벗어날 수 있습니다.<br>
때문에 회전을 하고 다시 가운데로 이동을 시켜주는 작업을 따로 했습니다.




