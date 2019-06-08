<template>
    <div id="menu">
        <h1>Menu</h1>
        <label>별점을 보시고 싶은/주고 싶은 카페를 선택해주세요!</label><br>
        <div @click="selectCafe(index)" v-for="(cl,index) in result" :key="result.id">{{cl.name}}</div>
        <div class="selectMenu" v-for="(ml,index) in menuList" v-if="menuList.length!=0" @click="selectMenu(index)">메뉴 : {{ml.menu}} | 평균별점 : {{ml.avgStar}}</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★★★★★ : {{selectedMenu[0].five}}명</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★★★★ : {{selectedMenu[0].four}}명</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★★★ : {{selectedMenu[0].three}}명</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★★ : {{selectedMenu[0].two}}명</div>
        <div class="Menu" v-if="selectedMenu.length!=0">★ : {{selectedMenu[0].one}}명</div><br>
        <form v-if="selectedMenu.length!=0" v-on:submit.prevent="rating">
            <label>메뉴에 대한 평가를 해주세요!</label><br>
            <select class="selectpicker select-size" @change="selectStarscore($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="5">★★★★★</option>
                <option value="4">★★★★</option>
                <option value="3">★★★</option>
                <option value="2">★★</option>
                <option value="1">★</option>
            </select><br>
            <button type="submit">평가하기</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data: function () {
            return {
                result:[],
                cafeList:[],
                menuList:[],
                selectedMenu:[],
                starScore:[],
                MenuName:"",
                cafeName:"",
            }
        },
        methods: {
            selectCafe(index) {
                this.menuList=[];//카페 선택할때 메뉴 비워주기
                this.cafeName = this.result[index].name;
                this.$http.get('http://localhost:8888/getCafeMenu',{params:{cafe:this.cafeName}}).then((result) => {//고른 카페에 대한 메뉴 불러오는 것
                    console.log(result);
                    for(var i=0;i<result.data.length;i++){
                        this.menuList.push({
                            cafe: this.cafeName,
                            menu: result.data[i].menu,//메뉴
                            avgStar : result.data[i].avgStar,//평균 별점
                        });
                    }
                    console.log(this.menuList)
                }).catch((err) => {
                    
                });
            },
            selectMenu(index){
                this.selectedMenu=[];
                var cafeName = this.menuList[index].cafe;
                this.MenuName = this.menuList[index].menu;
                // var data = {
                //
                // };
                // console.log(data)
                this.$http.get('http://localhost:8888/getSelectMenu',{params:{cafe: cafeName, menu : this.MenuName}}).then((result) => {//카페와 메뉴이름으로 메뉴 별점 가져오기
                   //별점 5점 4점 3점 2점 1점을 몇명이 줬는지 받아오기
                    this.selectedMenu.push({
                        five: result.data.five,
                        four: result.data.four,
                        three : result.data.three,
                        two : result.data.two,
                        one : result.data.one,
                    });
                    console.log(this.selectedMenu)
                }).catch((err) => {
                    
                });
            },
            selectStarscore(event){
                this.starScore = event.target.value;
            },
            rating(){
                var data = {
                    cafe : this.cafeName,//카페이름
                    menu : this.MenuName,//메뉴이름
                    rating : this.starScore,//별점 1/2/3/4/5로 보냄
                };
                console.log(data)
                this.$http.post('http://localhost:8888/ratingCafe',{data:data}).then((result) => {
                    console.log(result);//선택한 카페와 메뉴에 대한 별점주기
                    alert("성공적으로 평가가 되었습니다.")
                }).catch((err) => {
                    
                });
            },
        },
        created() {
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
.selectMenu{
    cursor: pointer;
}
</style>