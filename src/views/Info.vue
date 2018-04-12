<template>
	<div id="info" class="info">
		<form @submit.prevent name="form">
			<div class="title"><p>基本信息填写<span>( <em class="font-color">*</em> 为必填项，其余可不填写 )</span></p></div>
			<div class="basic-info">
				<div class="field photo item">
					<p class="desc"><em class="font-color">*</em>请您上传门头照片</p>
					<div class="image border-color">
						<div class="mask theme-mask-bgColor" :class="{hidden: seller.sellerInfo && seller.sellerInfo.headImg}">
							<p>上传门头照片</p>
						</div>
						<img id="headImg" :src="(seller.sellerInfo && seller.sellerInfo.headImg) || defaultHeadImg" alt="">
						<input name="headimg" type="file" accept="image/*" @change="uploadfile('headimg')" v-if="!isReadonly"/>
					</div>
				</div>
				<div class="field businessman item">
					<label class="desc" for=""><em class="font-color">*</em>经营人姓名：<input name="ownername" type="text" placeholder="请输入名称" v-model.trim="seller.sellerInfo && seller.sellerInfo.ownerName" :readonly="isReadonly" minlength="2" maxlength="6" required></label>
				</div>
				<div class="field telephone item">
					<label class="desc" for=""><em class="font-color">*</em>手机号：<input type="tel" placeholder="请输入手机号" v-model.trim="seller.sellerInfo && seller.sellerInfo.phoneNo" :readonly="isReadonly" minlength="11" maxlength="11" required></label>
				</div>
				<div class="field contact-name item">
					<label class="desc" for="">联系人姓名：<input type="text" placeholder="请输入联系人姓名" v-model.trim="seller.sellerInfo && seller.sellerInfo.contactName" minlength="2" maxlength="6"></label>
				</div>
				<div class="field contact-tel item">
					<label class="desc" for="">联系人电话：<input type="tel" placeholder="请输入联系人电话" v-model.trim="seller.sellerInfo && seller.sellerInfo.contactPhone" minlength="11" maxlength="11"></label>
				</div>
			</div>
			<div class="title"><p>行业信息</p></div>
			<div class="business-info">
				<div class="field store-name item">
					<label for="" class="desc"><em class="font-color">*</em>店铺名称：<input type="text" placeholder="请输入店铺名称" v-model.trim="seller.sellerInfo && seller.sellerInfo.shopName" :readonly="isReadonly" maxlength="10" required></label>
				</div>
				<div class="field store-address item">
					<label for="" class="desc"><em class="font-color">*</em>门店地址：
						<span id="lareaselectid"><span :class="{fakeselect: defaultAddr, trueselect: !defaultAddr}">{{(seller.sellerInfo && seller.sellerInfo.addrProvinceName && seller.sellerInfo.addrProvinceName + seller.sellerInfo.addrCityName + seller.sellerInfo.addrAreaName) || '请输入门店地址'}}</span></span>
            <input id="lareaselectval" type="hidden" />
					</label> 
				</div>
				<div class="field store-address-detail item">
					<label for="" class="desc"><input type="text" placeholder="请输入详细地址，精确到街道门牌号" v-model.trim="seller.sellerInfo && seller.sellerInfo.addrDetail" :readonly="isReadonly" maxlength="40" required></label>
				</div>
				<div class="field photo item">
					<p class="desc"><em class="font-color">*</em>上传烟草专卖零售许可证照</p>
					<div class="image border-color">
						<div class="mask theme-mask-bgColor" :class="{hidden: seller.sellerInfo && seller.sellerInfo.licenceImg}">
							<p>上传烟草专卖零售许可证件照</p>
						</div>
						<img id="licenceImg" :src="seller.sellerInfo && seller.sellerInfo.licenceImg || defaultLicenseImg" alt="">
						<input type="file" accept="image/*" @change="uploadfile" v-if="!isReadonly">
					</div>
				</div>
				<div class="field certificate item">
					<label for="" class="desc"><em class="font-color">*</em>烟草专卖零售许可证号：<input type="tel" placeholder="请输入烟草专卖零售许可证号" minlength="12" maxlength="12" v-model.trim="seller.sellerInfo && seller.sellerInfo.licenceNo" :readonly="isReadonly" required></label>
				</div>
				<div class="field area item">
					<p class="desc">
						<em class="font-color">*</em>区域：
						<label for="">
							<input type="radio" value="1" v-model="seller.sellerInfo && seller.sellerInfo.district" name="district" :disabled="isReadonly" :checked="seller.sellerInfo && seller.sellerInfo.district == 1"><span class="radio border-color border-box"></span>城镇
						</label>
						<label for="">
							<input type="radio" value="2" v-model="seller.sellerInfo && seller.sellerInfo.district" name="district" :disabled="isReadonly" :checked="seller.sellerInfo && seller.sellerInfo.district == 2"><span class="radio border-color border-box"></span>乡村
						</label>
					</p>
				</div>
				<div class="field pattern item">
					<label class="desc" for=""><em class="font-color">*</em>业态：
					<select v-if="!isReadonly" name="commercialType" v-model="seller.sellerInfo && seller.sellerInfo.commercial" required>
						<option value="">请选择</option>
						<option v-for="item in commercialTypes" :value="item.type">{{item.name}}</option>
					</select>
					<input v-if="isReadonly" type="text" :readonly="isReadonly" v-model="seller.sellerInfo && seller.sellerInfo.commercialName" value="seller.sellerInfo && seller.sellerInfo.commercial"></label>
				</div>
				<div class="field clerk item">
					<label class="desc" for=""><em class="font-color">*</em>业务员：<input type="text" placeholder="请填写名称" v-model="seller.sellerInfo && seller.sellerInfo.salesManNames" required></label>
				</div>
			</div>
			<div class="button">
				<button type="submit" class="theme-bg-color" id="submit" @click="submit">{{buttonText}}</button>
			</div>
		</form>

		<!-- 申请成功/失败弹窗 -->
		<mt-popup
		class="uni-pop pop border-box"
		v-if="confirmPop"
		v-model="confirmPop"
		:class="{success: success, fail: !success}"
		:closeOnClickModal="false"
		position="center">
			<pop-modal>
				<p class="font-color tip2">{{successState.text}}</p>
				<button slot="button" class="theme-bg-color_lighter" @click="iget">确认</button>
    		</pop-modal>
		</mt-popup>
	
		<!-- 进度条 -->
		<div class="loading-wrap" v-show="loadingpop">
			<div class="loading">
		        <span class="theme-bg-color_lighter"></span>
		        <span class="theme-bg-color_lighter"></span>
		        <span class="theme-bg-color_lighter"></span>
		        <span class="theme-bg-color_lighter"></span>
		        <span class="theme-bg-color_lighter"></span>
			</div>			
		</div>
	</div>
</template>

<script>
import Http from 'assets/lib/http.js'
import {mapGetters} from 'vuex'
import {getGeo} from 'api/geo.js'
import { Popup } from 'mint-ui'
import popModal from 'components/pop-modal'
import LRZ from 'lrz'
import LAREA from 'assets/lib/Larea.js'
import 'assets/lib/Larea.css'
// import defaultHeadImg from 'assets/image/common/bg_store.png'
// import defaultLicenseImg from 'assets/image/common/bg_monopolysale.png'

export default {
  	name: 'Info',
  	computed: {
  		...mapGetters([
	  		'seller',
	  		'sellerId'
	  	])
  	},
  	data () {
  		return {
  			isReadonly: false,
  			buttonText: '',
  			submitFlag: false,
	  		confirmPop: false, // 提交成功or失败弹窗
	  		success: false,
	  		successState: {
				text: ''
			},
			commercialTypes: [],
	  		defaultHeadImg: 'https://weiopn.oss-cn-beijing.aliyuncs.com/wx_retailer/common/bg_store.png',
	  		defaultLicenseImg: 'https://weiopn.oss-cn-beijing.aliyuncs.com/wx_retailer/common/bg_monopolysale.png',
			defaultAddr: true, // 选择门店地址用来占位的default值
			loadingpop: false,
			percent: 0 // 上传照片进度
  		}
  	},
  	created () {
		this.getInfoFromIndex();
  	},
	validators: {
        mobile: function (val) {
            // return /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,10}$/.test(val);
        }
    },
  	methods: {
  		getInfoFromIndex() {
  			this.$parent.loadingPage = false;
  			if (this.seller.sellerInfo) {
  				let sellerInfo = this.seller.sellerInfo;
  				this.isReadonly = (sellerInfo.authStatus == 2 && sellerInfo.licenceImg) ? true : false;
  				this.defaultAddr = sellerInfo.addrProvince ? false : true
  				if (!this.isReadonly) {
					this.buttonText = '确定';
  				} else {
  					this.seller.sellerInfo.district = 1;
  					this.buttonText = '提交审核';
  				}
  			} else {
  				this.seller.sellerInfo = {}; //一定要设置二级对象为空
  				this.seller.sellerInfo.district = 1;
  				this.buttonText = '提交审核';
  			}

  			if (!this.isReadonly) {
  				this.geoData();
				this.getCommercialType();
  			}
  		},
  		getCommercialType() {
  			this.commercialTypes = require('assets/data/common/commercialtype.json').commercial
  		},
  		uploadfile (flag) {
  			var file = event.target.files[0];
  			var me = this;
  			if (file && file.size > 6000000) { 
  				// 大于5M
  				alert('请上传小于5M图片');
  				return 
  			} else {
  				// 添加loading图
  				this.loadingpop = true
  			}

			LRZ(file, {width: 1024}).then(function (rst) {
	            // 处理成功会执行
	            var img = new Image();
	            img.src = rst.base64;
	            img.onload = function () {
	            	if (flag == 'headimg') {
	        			me.seller.sellerInfo.headImg = rst.base64;
	        		} else {
	        			me.seller.sellerInfo.licenceImg = rst.base64
	        		}
	            };
	            return rst;
	        }).then(function(rst){
	        	rst.formData.append('fileLen', rst.fileLen);
	            rst.formData.append('xxx', '我是其他参数');
	            return rst;
	        }).then(function (rst) {
	        	Http.post('/seller-manager/file/upload', rst.formData, {
		        	onUploadProgress: function (progressEvent) {
						// 使用本地 progress 事件做任何你想要做的
						if (progressEvent.lengthComputable) {
							me.percent = (progressEvent.loaded / progressEvent.total) * 100;
						} 
					}
				}, {
		        	headers: {
		        		'Content-Type': 'multipart/form-data'
		        	}
		        }).then(res => {
		        	var Data = res.data;
		        	if (Data.ok) {
		        		if (flag == 'headimg') {
		        			me.seller.sellerInfo.headImg = Data.msg;
		        		} else {
		        			me.seller.sellerInfo.licenceImg = Data.msg
		        		}
		        		me.loadingpop = false;
		        	} else {
		        		alert('服务器开小差啦，请稍后重新上传~');
		        		me.loadingpop = false;
		        	}
		        }).catch(error => {
					//超时之后在这里捕抓错误信息.
					alert('上传照片失败，请重新上传~')
					me.loadingpop = false;
					if (error.response) {
						console.log('error.response')
						console.log(error.response);
					} else if (error.request) {
						console.log(error.request)
						console.log('error.request')
						if(error.request.readyState == 4 && error.request.status == 0){
							//我在这里重新请求
						}
					} else {
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
	        }).catch(function (err) {
	            // 处理失败会执行
	            alert('Oops，上传失败，请重新上传~')
	        })
  		},
  		geoData() {
  			if (this.isReadonly) {
  				return
  			}
  			var area = new LAREA();
  			var me = this;
			getGeo().then(res => {
				if (res.ok) {
					const Data = res.data;
					var provs_data = Data.provinces,
						citys_data = Data.cities,
						dists_data = Data.areas;
		        	area.init({
				        'trigger': '#lareaselectid',
				        'valueTo': '#lareaselectval',
				        'keys': {
				            id: 'code',
				            name: 'name'
				        },
				        'type': 2,
				        'data': [provs_data, citys_data, dists_data]
				    })
				}
			})
  		},
  		submit () {
  			if (form.checkValidity()) {
  				var a_lareaselectval = document.getElementById('lareaselectval').value.split(',');
  				if (a_lareaselectval != '') {
	  				this.seller.sellerInfo.addrProvince = a_lareaselectval && a_lareaselectval[0];
	        		this.seller.sellerInfo.addrCity = a_lareaselectval && a_lareaselectval[1];
	        		this.seller.sellerInfo.addrArea = a_lareaselectval && a_lareaselectval[2];
  				}

				var submitData = JSON.stringify(this.seller.sellerInfo);
	  			if (!this.submitFlag) {
	  				this.submitFlag = true;
	  				this.loadingpop = true;
	  				var me = this;
	  				Http.post('/seller-web/seller/apply/certificate', submitData, {
	  						headers: {
	        					'Content-Type': 'application/json; charset=UTF-8'
	        				}
	        			}).then(res => {
		  					var Data = res.data;
		  					me.confirmPop = true;
		        			if (Data.ok) {
		        				// 激活成功
		        				me.success = true;
		        				me.loadingpop = false;
		        				if (me.sellerId && (me.seller.sellerInfo.authStatus == 2 || me.seller.sellerInfo.authStatus == 4)) {
		        					me.successState.text = '信息完善成功！';
		        				} else {
		        					me.successState.text = '已申请，请等待审核通知！'
		        				}
		        			} else {
		        				// 激活失败
		        				me.loadingpop = false;
		        				this.submitFlag = false;
		        				me.successState.text = Data.msg;
		        			}
						})
	  			}
  			} else {
  				alert('请确保所有必填项目已填写')
  			}
  		},
  		// 激活与否的弹窗，确认按钮
      	iget () {
      		if (this.success) {
	      		this.$router.push({path:'/retailer/index'})
      		} else {
      			this.confirmPop = false;
      		}
      	}
  	},
  	components: {
  		popModal
  	}
}
</script>
<style lang="scss" scoped>
@mixin border-radius($num) {
	-webkit-border-radius: $num;
	-moz-border-radius: $num;
	-ms-border-radius: $num;
	border-radius: $num;
}
.info {
	width: 100%;
	overflow-x: hidden;
	.title {
		margin-bottom: 0.4rem;
		padding-left: .2rem;
		height: 1.2733rem;
		font-size: 0.45333rem;
		background: #fff;
		p {
			line-height: 1.3rem;
			padding-left: .82rem;
			height: 100%;
			span {
				margin-left: .2rem;
				font-size: 0.42rem;
				color: #666;
			}
		}
	}
	.basic-info, .business-info {
		margin-bottom: .4rem;
		padding-left: .3rem;
		background: #fff;
		.photo {
			padding-bottom: .5rem;
		}
		.item {
			overflow: hidden;
			border-bottom: 1px solid #ccc;
			.desc {
				overflow: hidden;
				line-height: 1.2733rem;
				height: 1.2733rem;
				font-size: .42rem;
				em {
					margin-right: .15rem;
				}
				label {
					display: inline-block;
				}
				input[type="text"], input[type="tel"], select {
					margin-left: .15rem;
					/*padding: 0.37rem 0.08rem 0.37rem 0.16rem;*/
					width: 60%;
					line-height: 0.6rem;
					font-size: .42rem;
					color: #666;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				select {
					background: transparent;
				    outline: 0 none;
				    border: 0 none;
				}
				.fakeselect {
					padding-right: 4rem;
					color: #ccc
				}
				.trueselect {
					color: #666;
				}
			}
			.image {
				overflow: hidden;
				position: relative;
				margin: 0 auto;
				padding: .07rem;
				width: 3.866rem;
				height: 2.8933rem;
				border-width: 1px;
				border-style: solid;
				background-repeat: no-repeat;
				background-size: cover;
				background-clip: content-box;
				.mask {
					position: absolute;
					left: .07rem;
					top: .07rem;
					right: .07rem;
					bottom: .07rem;
					p {
						height: 100%;
						line-height: 4.5rem;
						color: #fff;
						text-align: center;
						font-size: .37rem;
						font-weight: bold;
					}
					&:after {
						content: '+';
						position: absolute;
						top: .6rem;
						left: 1.45rem;
						width: 1.04rem;
						height: 1.04rem;
						line-height: .9rem;
						@include border-radius(50%);
						color: #fff;
						font-size: 1.2rem;
						font-weight: 400;
						text-align: center;
						background: rgba(255, 255, 255, .5);
					}
				}
				img {
					width: 100%;
					height: 100%;
				}
				input[type="file"] {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
			}
			&:last-child {
				border-bottom: none;
			}
		}
		.store-address-detail {
			input {
				width: 90%!important;
			}
		}
		.certificate {
			input {
				width: 90%!important;
			}
		}
		.area {
			label {
				position: relative;
				display: inline-block;
				margin-left: 1.2rem;
				padding-left: .6rem;
				input[type="radio"] {
					position: absolute;
					left: -.2rem;
    				top: 45%;
    				-webkit-transform: translateY(-50%);
    				-moz-transform: translateY(-50%);
    				-ms-transform: translateY(-50%);
    				transform: translateY(-50%);
					z-index: 3;
					opacity: 0;
					width: 1.6rem;
					height: .6rem;
				}
				.radio {
					position: absolute;
					left: -.1rem;
		    		top: 50%;
		    		-webkit-transform: translateY(-50%);
		    		-moz-transform: translateY(-50%);
		    		-ms-transform: translateY(-50%);
		    		transform: translateY(-50%);
		    		padding: .04rem;
					width: .4rem;
				    height: .4rem;
				    border-width: 1px;
				    border-style: solid;
				    @include border-radius(50%);
				    background-clip: content-box;
				}
			}
		}
	}
	.basic-info {
		.contact-name, .contact-tel {
			label {
				padding-left: .36rem;
			}
		}
	}
	.button {
		margin: 1rem auto;
		button {
			display: block;
			margin: 0 auto;
			width: 6.573rem;
			height: 1.02rem;
			line-height: 1.02rem;
			text-align: center;
			font-size: .48rem;
			color: #fff;
			@include border-radius(4px)
		}
	}
	em {
		font-size: .57rem;
		vertical-align: -webkit-baseline-middle;
	}
	
	.uni-pop {
		.modal-wrap {
			padding-top: 3rem!important;
		}		
	}

	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	    color: #C5C5C7;
	    font-size: .4rem;
	}

	::-moz-placeholder { /* Mozilla Firefox 19+ */
	    color: #C5C5C7;
	    font-size: .4rem;
	}

	input:-ms-input-placeholder {
	    color: #C5C5C7;
	    font-size: .4rem;
	}

	input::-webkit-input-placeholder {
	    color: #C5C5C7;
	    font-size: .4rem;
	}
	[readonly="readonly"] {
	  	user-select: none;
	  	pointer-events: none;
	}
}
#lareaselectid {
	position: absolute;
	padding: 0;
	width: 65%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	span {
		padding: 0;
	}
}
</style>