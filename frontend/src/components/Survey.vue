<template>
    <div id="survey">
        <h1>설문</h1>
        <h2>학교앞 원하시는 카페를 추천해 드립니다.</h2>
        <form v-on:submit.prevent="submit" >
            <label>카페를 가시는 이유!</label><br>
            <select class="selectpicker select-size" @change="chooseReason($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="0">상관없음</option>
                <option value="공부">공부</option>
                <option value="사진">사진</option>
                <option value="테이크아웃">테이크아웃</option>
                <option value="수다">수다</option>
            </select><br><br>
            <label>원하시는 카페 메뉴 종류!</label><br>
            <select class="selectpicker select-size" @change="chooseMenu($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="0">상관없음</option>
                <option value="커피">커피</option>
                <option value="차">차</option>
                <option value="음료">음료</option>
                <option value="공부">공부</option>
            </select><br><br>
            <label>원하시는 가격대!</label><br>
            <select class="selectpicker select-size" @change="chooseCost($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="0">상관없음</option>
                <option value="1">2000원대</option>
                <option value="2">3000원대</option>
                <option value="3">4000원대</option>
                <option value="4">5000원대</option>
            </select><br><br>
            <label>거리는 어느정도?</label><br>
            <img src="../assets/map.png" /><br>
            <select class="selectpicker select-size" @change="chooseDistance($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="0">상관없음</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select><br><br>
            <button type="submit">추천받기 GOGO</button>
        </form><br>
        <div>카페목록</div>
        <div @click="selectCafe(index)" v-for="(cl,index) in recommResult" :key="recommResult.id">카페이름 : {{cl.name}} | 주소: {{cl.address}}</div>
        <div class="selectMenu" v-for="(ml,index) in menuList" v-if="menuList.length!=0" @click="selectMenu(index)">메뉴 : {{ml.menu}} | 평균별점 : {{ml.avgStar}}</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★★★★★ : {{selectedMenu[0].five}}명</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★★★★ : {{selectedMenu[0].four}}명</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★★★ : {{selectedMenu[0].three}}명</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★★ : {{selectedMenu[0].two}}명</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★ : {{selectedMenu[0].one}}명</div><br>
    </div>
</template>

<script>
    export default {
        name: "survey",
        component:{
            
        },
        data: function(){
            return{
                reason:[],
                menu:[],
                cost:-1,
                distance:[],
                result:[],
                menuList:[],
                selectedMenu:[],
                MenuName:"",
                alladdress:[],
                recommResult:[],
            }
        },
        methods:{
            selectMenu(index){
                this.selectedMenu=[];
                this.MenuName = this.menuList[index].menu;
                var data = {
                    cafe: this.selected,
                    menu : this.MenuName,
                };
                this.$http.get('http://localhost:8888/getSelectMenu',{params:{data:data}}).then((result) => {//카페와 메뉴이름으로 메뉴 별점 가져오기
                    console.log(result);//별점 5점 4점 3점 2점 1점을 몇명이 줬는지 받아오기
                    this.selectedMenu.push({
                        five: result.data.five,
                        four: result.data.four,
                        three : result.data.three,
                        two : result.data.two,
                        one : result.data.one,
                    });
                }).catch((err) => {
                    
                });
            },
            selectCafe(index) {
                this.menuList=[];//카페 선택할때 메뉴 비워주기
                var cafeName = this.result[index].name;
                this.$http.get('http://localhost:8888/getCafeMenu',{params:{cafe:cafeName}}).then((result) => {//고른 카페에 대한 메뉴 불러오는 것
                    console.log(result.data);
                    for(var i=0;i<result.data.length;i++){
                        this.menuList.push({
                            menu: result.data[i].menu,//메뉴
                            avgStar : result.data[i].avgStar,//평균 별점
                        });
                    }
                }).catch((err) => {
                    
                });
            },
            chooseReason(event){
                this.reason = event.target.value;
                console.log(this.reason)
            },
            chooseMenu(event){
                this.menu = event.target.value;
                console.log(this.menu)
            },
            chooseCost(event){
                if(event.target.value=="0"){
                    this.cost = 0;
                }
                else if(event.target.value=="1"){
                    this.cost = 2;
                }
                else if(event.target.value=="2"){
                    this.cost = 3;
                }
                else if(event.target.value=="3"){
                    this.cost = 4;
                }
                else{
                    this.cost = 5;
                }
            },
            chooseDistance(event){
                this.distance = event.target.value;
            },
            submit(){
                this.alladdress = this.result;
                // console.log(this.alladdress)
                // this.result=[];
                this.recommResult=[];
                var reason = this.reason;
                var menu = this.menu;
                var cost = this.cost;
                var distance = this.distance;
                this.$http.get('http://localhost:8888/recommendationCafe',{params:{reason: reason,menu:menu,cost:cost,distance:distance}}).then((result) => {
                    for(var i=0;i<this.alladdress.length;i++){
                        for(var j=0;j<result.data.length;j++){
                            if(this.alladdress[i].name==result.data[j]){
                                this.recommResult.push({
                                    name : result.data[j],
                                    address : this.alladdress[i].address
                                });
                            }
                        }
                    }
                    // console.log(this.result)
                }).catch((err) => {
                    
                });
            },
        },
        created: function () {
            this.$http.get('http://localhost:8888/getCafe').then((result) => {//카페리스트 불러오기
                console.log(result);
                for(var i=0;i<result.data.length;i++){
                    this.result.push({
                        name : result.data[i].cafeName,
                        address : result.data[i].cafeAddress,
                    });
                }
            }).catch((err) => {
                
            });
        }
    }
</script>

<style scoped>
img{
    width: 200px;
    height: 300px;
}
</style>