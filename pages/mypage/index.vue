<template>
  <view class="container">
    <view class="header">
      <image
        :src="store.basicInfo.avatar"
        mode="aspectFit"
        class="avatar"
      ></image>
      <text @click="getUserInfo">{{ store.basicInfo.nickname }}</text>
    </view>
		<button @click="test">test</button>
    <view class="tabbar">
      <tabbarVue></tabbarVue>
    </view>
  </view>
</template>

<script setup>
import { reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { userInfoStore } from "../../stores/userinfo";
import tabbarVue from "../../components/Tabbar.vue";
import { request } from "../../utils/request";

const store = userInfoStore();

const test =async () =>{
	try{
		const res = await request({a:1}).add()
	}catch(e){
		
	}
}

const getUserInfo = async () => {
  try {
    //获取code
    const loginRes = await uni.login({ provider: "weixin" });

    if (loginRes.errMsg !== "login:ok") throw Error("获取code失败");

    //获取用户信息
    const { userInfo } = await uni.getUserInfo({ provider: "weixin" });
    //登录
    //使用自带api访问
    const user = uniCloud.importObject("userObj");
    const res = await user.login({ code: loginRes.code, userinfo: userInfo });
    const data = res.result.data[0];

    // 使用url访问
    // const res = await uni.request({
    // 	url: '/userObj/loginInUrl',
    // 	method: 'POST',
    // 	header: {
    // 		'content-type': 'application/json'
    // 	},
    // 	data: {
    // 		code: 1,
    // 		userinfo: 2
    // 	}
    // });
    //const data = res.data.result.data[0];

    // 如果返回了数据
    if (data) {
      // 修改pinia的状态
      store.$patch({
        basicInfo: {
          nickname: data.nickName,
          avatar: data.avatarUrl,
        },
      });
      // 储存token
      uni.setStorageSync("token", data.token);
    }
  } catch (err) {
    // 提示用户登录失败
    uni.showToast({
      icon: "error",
      title: "请求失败",
      duration: 2000,
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: $bg-color-grey;
  position: relative;
  .header {
    width: 100%;
    height: 15%;
    background-color: #003498;
    color: #fff;
    display: flex;
    align-items: center;
    border: 1rpx solid black;
    .avatar {
      width: 100rpx;
      height: 100rpx;
      background-color: #fff;
      border-radius: 50rpx;
      border: 4rpx solid #fff;
      margin: auto 20rpx;
    }
  }
  .tabbar {
    width: 100%;
    height: 8%;
    position: absolute;
    bottom: 0;
  }
}
</style>
