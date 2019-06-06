<template>
    <div id="survey">
        <h1>설문</h1>
        <h2>학교앞 원하시는 카페를 추천해 드립니다.</h2>
        <form v-on:submit.prevent="submit" >
            <label>카페를 가시는 이유!</label><br>
            <select class="selectpicker select-size" @change="chooseReason($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="공부">공부</option>
                <option value="사진">사진</option>
                <option value="테이크아웃">테이크아웃</option>
                <option value="수다">수다</option>
            </select><br><br>
            <label>원하시는 카페 메뉴 종류!</label><br>
            <select class="selectpicker select-size" @change="chooseMenu($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="커피">커피</option>
                <option value="차">차</option>
                <option value="음료">음료</option>
                <option value="공부">공부</option>
            </select><br><br>
            <label>원하시는 가격대!</label><br>
            <select class="selectpicker select-size" @change="chooseCost($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="2000원대">2000원대</option>
                <option value="3000원대">3000원대</option>
                <option value="4000원대">4000원대</option>
                <option value="5000원대">5000원대</option>
                <option value="6000원이상">6000원이상</option>
            </select><br><br>
            <label>거리는 어느정도?</label><br>
            <img src="../assets/map.png" /><br>
            <select class="selectpicker select-size" @change="chooseDistance($event)">
                <option value="" selected disabled hidden style="font-color:#aab1bb;">선택해주세요</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select><br><br>
            <button type="submit">추천받기 GOGO</button>
        </form><br>
        <div>추천해드리는 카페는!</div>
        {{result}}
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
                cost:[],
                distance:[],
                result:[],
            }
        },
        methods:{
            chooseReason(event){
                this.reason = event.target.value;
            },
            chooseMenu(event){
                this.menu = event.target.value;
            },
            chooseCost(event){
                this.cost = event.target.value;
            },
            chooseDistance(event){
                this.distance = event.target.value;
            },
            submit(){
                var data = {
                    reason : this.reason,
                    menu : this.menu,
                    cost : this.cost,
                    distance : this.distance,
                }
                console.log(data);
                // this.$http.get('http://localhost:8888/recommendationCafe',{params:{data: data}}).then((result) => {
                //     console.log(result)
                //     this.result = result.data
                // }).catch((err) => {
                    
                // });
            },
        },
        created: function () {

        }
    }
</script>

<style scoped>
img{
    width: 200px;
    height: 300px;
}
</style>