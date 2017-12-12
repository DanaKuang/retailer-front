<template>
	<div id="info" class="info">
		<form @submit.prevent name="form">
			<div class="title"><p>基本信息填写<span>(<em class="font-color">*</em>为必填项，其余可不填写)</span></p></div>
			<div class="basic-info">
				<div class="field photo item">
					<p class="desc"><em class="font-color">*</em>请您上传门头照片</p>
					<div class="image border-color">
						<div class="mask theme-mask-bgColor" v-show="!isheadImg">
							<p>上传门头照片</p>
						</div>
						<img :src="user.headImg || defaultHeadImg" alt="">
						<input name="headimg" type="file" accept="image/*" capture="photo" @change="uploadfile('headimg')" required>
					</div>
				</div>
				<div class="field businessman item">
					<label class="desc" for=""><em class="font-color">*</em>经营人姓名：<input name="ownername" type="text" placeholder="请输入名称" v-model.trim="user.ownerName" :readonly="isReadonly" minlength="2" maxlength="5" required></label>
				</div>
				<div class="field telephone item">
					<label class="desc" for=""><em class="font-color">*</em>手机号：<input type="tel" placeholder="请输入手机号" v-model.trim="user.phoneNo" :readonly="isReadonly" minlength="11" maxlength="11" required></label>
				</div>
				<div class="field contact-name item">
					<label class="desc" for="">联系人姓名：<input type="text" placeholder="请输入联系人姓名" v-model.trim="user.contactName" minlength="2" maxlength="5"></label>
				</div>
				<div class="field contact-tel item">
					<label class="desc" for="">联系人电话：<input type="tel" placeholder="请输入联系人电话" v-model.trim="user.contactPhone" minlength="11" maxlength="11"></label>
				</div>
			</div>
			<div class="title"><p>行业信息</p></div>
			<div class="business-info">
				<div class="field store-name item">
					<label for="" class="desc"><em class="font-color">*</em>店铺名称：<input type="text" placeholder="请输入店铺名称" v-model.trim="user.shopName" :readonly="isReadonly" maxlength="10" required></label>
				</div>
				<div class="field store-address item">
					<label for="" class="desc"><em class="font-color">*</em>门店地址：<input name="showselectaddress" v-if="!isReadonly" type="text" placeholder="请选择门店地址" @click="showProvince" v-model="showselectaddress" readonly="true" required><input v-if="isReadonly" type="text" :readonly="isReadonly" :value="user.address"></label>
				</div>
				<div class="field store-address-detail item">
					<label for="" class="desc"><input type="text" placeholder="请输入详细地址，精确到街道门牌号" v-model.trim="user.addrDetail" :readonly="isReadonly" maxlength="40" required></label>
				</div>
				<div class="field photo item">
					<p class="desc"><em class="font-color">*</em>上传烟草专卖零售许可证照</p>
					<div class="image border-color">
						<div class="mask theme-mask-bgColor" v-show="!isLicenseImg">
							<p>上传烟草专卖零售许可证件照</p>
						</div>
						<img :src="user.licenceImg || defaultLicenseImg" alt="">
						<input type="file" accept="image/*" capture="photo" @change="uploadfile" required>
					</div>
				</div>
				<div class="field certificate item">
					<label for="" class="desc"><em class="font-color">*</em>烟草专卖零售许可证号：<input type="tel" placeholder="请输入烟草专卖零售许可证号" v-model.trim="user.licenceNo" :readonly="isReadonly" required></label>
				</div>
				<div class="field area item">
					<p class="desc">
						<em class="font-color">*</em>区域：
						<label for="">
							<input type="radio" value="1" v-model="user.district" name="district" :disabled="isReadonly" :checked="user.district == 1"><span class="radio border-color border-box"></span>城镇
						</label>
						<label for="">
							<input type="radio" value="2" v-model="user.district" name="district" :disabled="isReadonly" :checked="user.district == 2"><span class="radio border-color border-box"></span>乡村
						</label>
					</p>
				</div>
				<div class="field pattern item">
					<label class="desc" for=""><em class="font-color">*</em>业态：
					<select v-if="!isReadonly" name="commercialType" v-model="user.commercial" required>
						<option value="">请选择</option>
						<option v-for="item in commercialTypes" :value="item.type">{{item.name}}</option>
					</select>
					<input v-if="isReadonly" type="text" :readonly="isReadonly" v-model="user.commercialName" value="user.commercial"></label>
				</div>
				<div class="field clerk item">
					<label class="desc" for=""><em class="font-color">*</em>业务员：<input type="text" placeholder="请填写名称" v-model="user.salesManNames"required></label>
				</div>
			</div>
			<div class="button">
				<button type="submit" class="theme-bg-color" id="submit" @click="submit">{{buttonText}}</button>
			</div>
			<!-- 门店地址选择 -->
			<mt-popup
			class="selectAddressPop"
			v-if="selectAddressPop"
			v-model="selectAddressPop"
			position="right">
				<div class="address-pop">
					<div class="input-group border-box">
	                    <div class="select-menu">
	                        <label>
	                            <select name="addrProvince" class="border-color" v-model="provinceSelected">
	                                <option value="-1">请选择</option>
	                                <option v-for="item in province" :value="item.code">{{item.name}}</option>
	                            </select>
	                            <span>省</span>
	                        </label>
	                    </div>
	                    <div class="select-menu">
	                        <label>
	                            <select name="addrCity" class="border-color" v-model="citySelected">
	                                <option value="-1">请选择</option>
	                                <option v-for="item in city" :value="item.code">{{item.name}}</option>
	                            </select>
	                            <span>市</span>
	                        </label>
	                    </div>
	                    <div class="select-menu">
	                        <label>
	                            <select name="addrArea" class="border-color" v-model="districtSelected">
	                                <option value="-1">请选择</option>
	                                <option v-for="item in district" :value="item.code">{{item.name}}</option>
	                            </select>
	                            <span>区</span>
	                        </label>
	                    </div>
	                </div>
	                <button class="confirmAddress theme-bg-color_lighter" :class="{'disabled-btn': !confirmAddress}" @click="choosePCD" :disabled="!confirmAddress">确定</button>
				</div>
			</mt-popup>
		</form>
		<!-- 申请成功/失败弹窗 -->
		<mt-popup
		class="uni-pop pop border-box"
		v-if="confirmPop"
		v-model="confirmPop"
		:class="{success: successActivate, fail: !successActivate}"
		:closeOnClickModal="false"
		position="center">
			<pop-modal>
				<p class="font-color tip2">{{activateState.text}}</p>
				<button slot="button" class="theme-bg-color_lighter" @click="iget">确认</button>
    		</pop-modal>
		</mt-popup>
	</div>
</template>

<script>
import axios from 'axios'
import { Popup } from 'mint-ui'
import popModal from '../components/pop-modal'

export default {
  	name: 'Info',
  	data () {
  		return {
  			isReadonly: false,
  			isheadImg: false,
  			isLicenseImg: false,
  			user: {
  				qrStyle: '1',
  				commercial: ''
  			},
  			buttonText: '',
  			submitFlag: false,
  			selectAddressPop: false,
  			defaultHeadImg: '/src/assets/image/common/bg_store.png',
  			defaultLicenseImg: '/src/assets/image/common/bg_monopolysale.png',
  			province: [],
  			city: [],
  			district: [],
  			provinceSelected: '-1',
  			citySelected: '-1',
  			districtSelected: '-1',
  			confirmAddress: false,
  			showselectaddress: '',
	  		commercialTypes: [],
	  		salesManNames: '',
	  		confirmPop: false, // 激活成功or失败弹窗
	  		successActivate: false,
	  		activateState: {
				text: ''
			}
  		}
  	},
  	components: {
  		popModal
  	},
  	watch: {
  		provinceSelected: 'showCity',
  		citySelected: 'showDistrict',
  		districtSelected: 'changeConfirmAddressButtonStatus'
  	},
  	created () {
		this.$bus.on('infopage', this.getInfoFromIndex);
  	},
  	mounted() {
		this.getCommercialType()
  	},
  	beforeDestroy() {
  		this.$bus.off('infopage', this.getInfoFromIndex)
  	},
	validators: {
        mobile: function (val) {
            return /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,10}$/.test(val);
        }
    },
  	methods: {
  		getInfoFromIndex(val) {
  			if (val.hasOwnProperty('sellerId')) {
  				this.user = val;
	  			this.isReadonly = (this.user.authStatus == 2 ? true : false);
	  			this.user.address = this.user.addrProvinceName + ' ' + this.user.addrCityName;
	  			this.buttonText = '确定';
  			} else {
  				this.user.district = 1;
  				this.buttonText = '提交审核'
  			}
  		},
  		getCommercialType() {
  			axios.get('/static/common/commercialtype.json')
  				.then(res => {
  					const Data = res.data;
					this.$data.commercialTypes = res.data.commercial;
  				})
  		},
  		uploadfile (flag) {
  			let files = event.target.files[0];
	        let formData = new FormData();
	        formData.append('file', files);
	        axios.post('/seller-manager/file/upload', formData, {
	        	headers: {
	        		'Content-Type': 'multipart/form-data'
	        	}
	        }).then(res => {
	        	const Data = res.data;
	        	if (Data.ok) {
	        		if (flag == 'headimg') {
	        			this.user.headImg = Data.msg;
	        			this.isheadImg = true;
	        		} else {
	        			this.user.licenceImg = Data.msg
	        			this.isLicenseImg = true;
	        		}
	        	}
	        })
  		},
        showProvince() {
        	this.selectAddressPop = true;
        	// 请求省份的接口
        	axios.post('/seller-manager/region/province')
        		.then(res => {
        			this.province = res.data;
        		})
        },
        showCity(val, oldVal) {
        	if (val != oldVal) {
        		this.citySelected = '-1';
        		axios.post('/seller-manager/region/newCity', {parentCode: val})
        		.then(res => {
        			this.city = res.data;
        		})
        	}
        },
        showDistrict(val, oldVal) {
        	if (val != oldVal) {
        		this.districtSelected = '-1';
				axios.post('/seller-manager/region/newDistrict', {parentCode: val})
        		.then(res => {
        			this.district = res.data;
        		})
        	}
        },
        changeConfirmAddressButtonStatus(val, oldVal) {
        	if (val != '-1') {
        		this.confirmAddress = true;
        	} else {
        		this.confirmAddress = false;
        	}
        },
        choosePCD() {
        	if (this.provinceSelected != '-1' && this.citySelected != '-1' && this.districtSelected != '-1') {
        		this.user.addrProvince = this.provinceSelected;
        		this.user.addrCity = this.citySelected;
        		this.user.addrArea = this.districtSelected;

        		this.showselectaddress = form.addrProvince.selectedOptions[0].innerText + ' ' + form.addrCity.selectedOptions[0].innerText + ' ' + form.addrArea.selectedOptions[0].innerText;

        		this.selectAddressPop = false;
        	} 
        },
  		submit () {
  			if (form.checkValidity()) {
				let submitData = JSON.stringify(this.user);
	  			if (!this.submitFlag) {
	  				this.submitFlag = true;
	  				let me = this;
	  				axios.post('/seller-web/seller/apply/certificate', submitData, {
	  						headers: {
	        				'Content-Type': 'application/json; charset=UTF-8'
	        				}
	        			}).then(res => {
		  					const Data = res.data;
		  					me.confirmPop = true;
		        			if (Data.ok) {
		        				// 激活成功
		        				me.successActivate = true;
		        				me.activateState.text = '申请成功，请等待审核通知！';
		        			} else {
		        				// 激活失败
		        				me.activateState.text = Data.msg;
		        			}
						})
	  			}
  			}
  		},
  		// 激活与否的弹窗，确认按钮
      	iget () {
      		this.$router.push({path:'/retailer/index'})
      	}
  	},
  	computed: {
  		
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
			border-bottom: 1px solid #ccc;
			.desc {
				height: 1.2733rem;
				line-height: 1.2733rem;
				font-size: .42rem;
				em {
					margin-right: .15rem;
				}
				input[type="text"], input[type="tel"], select {
					padding-left: .3rem;
					margin-left: .15rem;
					width: 60%;
					font-size: .37rem;
					color: #666;
					border-left: 1px solid #ccc;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				select {
					background: transparent;
				    outline: 0 none;
				    border-right: 0 none;
				    border-top: 0 none;
				    border-bottom: 0 none;
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
						font-size: .267rem;
						font-weight: bold;
					}
					&:after {
						content: '+';
						position: absolute;
						top: .6rem;
						left: 1.45rem;
						width: 1.04rem;
						height: 1.04rem;
						line-height: 1.2rem;
						@include border-radius(50%);
						color: #fff;
						font-size: 1.2rem;
						font-weight: bold;
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
				width: 95%!important;
				border-left: 0 none!important;
			}
		}
		.certificate {
			input {
				width: 90%!important;
				border-left: 0 none!important;
			}
		}
		.area {
			label {
				position: relative;
				margin-left: 1.5rem;
				padding-left: .6rem;
				input[type="radio"] {
					position: absolute;
					left: -.1rem;
    				top: .02rem;
					z-index: 3;
					opacity: 0;
				}
				.radio {
					position: absolute;
					left: -.1rem;
		    		top: .02rem;
		    		padding: .03rem;
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
		vertical-align: -webkit-baseline-middle;
	}
	.selectAddressPop {
		width: 100%;
		height: 6rem;
		.address-pop {
			width: 100%;
			height: 100%;
			background: #fff;
			.input-group {
				font-size: 0;
				padding: 0 .3rem; 
				width: 100%;
				height: 2rem;
				-webkit-transform: translate3d(0, 60%, 0);
				-moz-transform: translate3d(0, 60%, 0);
				-ms-transform: translate3d(0, 60%, 0);
				transform: translate3d(0, 60%, 0);
				.select-menu {
					display: inline-block;
					width: 33.3%;
					label {
						overflow: hidden;
						width: 100%;
						font-size: 0;
						display: block;
						select {
							display: inline-block;
							vertical-align: middle;
							width: 80%;
							height: 1rem;
							border-width: 1px;
							border-style: solid;
							option {
								font-size: .37rem;
							}
						}
						span {
							display: inline-block;
							vertical-align: middle;
							width: 20%;
							font-size: .37rem;
						}
					}
				}
			}
			button {
				display: block;
				margin: 1.7rem auto;
			    width: 6.4rem;
			    height: .90667rem;
			    line-height: .907rem;
			    color: #fff;
			    text-align: center;
			    font-size: .48rem;
			    border-radius: 4px;
			}
		}
	}
	
	.uni-pop {
		.modal-wrap {
			padding-top: 3rem!important;
		}		
	}

	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	    color: #C5C5C7;
	    font-size: .37rem;
	}

	::-moz-placeholder { /* Mozilla Firefox 19+ */
	    color: #C5C5C7;
	    font-size: .37rem;
	}

	input:-ms-input-placeholder {
	    color: #C5C5C7;
	    font-size: .37rem;
	}

	input::-webkit-input-placeholder {
	    color: #C5C5C7;
	    font-size: .37rem;
	}
}
</style>