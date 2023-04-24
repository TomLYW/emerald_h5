import { useUserStore } from '@/store/user.js';
import moment from 'moment';

const user = useUserStore();

/*判断是否登录*/
export function whetherLogin() {
	const isLogin = user.isLogin;
	if (!isLogin) {
		uni.navigateTo({
			url: '/pages/Login/index'
		})
	}
	return isLogin;
}

/*判断是否设置支付密码*/
export function whetherSetPin() {
	const isSetPin = user.userInfo.isSetPin;
	if (!isSetPin) {
		uni.navigateTo({
			url: '/pages/Mine/setting/setPayPassword'
		})
	}
	return isSetPin;
}

/*生成随机名称*/
export function algorithm() {
	let abc = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'g',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	];
	let [max, min] = [
		Math.floor(Math.random() * (10 - 7 + 1) + 1),
		Math.floor(Math.random() * (17 - 10 + 1) + 17),
	];
	abc = abc
		.sort(() => 0.4 - Math.random())
		.slice(max, min)
		.slice(0, 8)
		.join('');
	return new Date().getTime() + abc;
}

/*手机号加密*/
export function phoneEncryption(phone) {
	if (!phone) return '-';
	return phone.substring(0, 3) + '****' + phone.substring(7);
}

/*邮箱加密*/
export function emailEncryption(email) {
	const index = email.indexOf('@');
	return email.substring(0, 3) + '****' + email.substring(index);
}

/*当前时间是否超过该时间*/
export function whetherExceedDate(date) {
	const oldDate = new Date(date);
	return Date.now() >= oldDate.getTime();
}

/*判断是否是邮箱*/
export function isEmailAddress(email) {
	const regEmail =
		/^([a-zA-Z0-9_\-\.])+[^.\?]@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	return regEmail.test(email);
}

/*密码必须包含数字和字母 至少8位*/
export function checkPassword(password) {
	let str = password;

	if (str == null || str.length < 8) {
		return false;
	}

	let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
	return reg.test(str);
}

/*检查是否是纯数字*/
export function checkNumber(theObj) {
	let reg = /^[0-9]+.?[0-9]*$/;
	return reg.test(theObj);
}

/* 科学计数法转字符串 */
export function convertString(number) {
	if (isNaN(number)) return;
	if (typeof number === 'string') return number;

	let str = String(number);
	let result = number > 0 ? String(number + 1) : String(number - 1);
	if (str.indexOf('e-') !== -1) {
		result =
			number > 0 ? '0' + result.substring(1) : '-0' + result.substring(2);
		return result;
	} else {
		return str;
	}
}

// 小数计算丢失精度处理（乘法）
export function accMul(arg1, arg2) {
	let m = 0,
		s1 = convertString(arg1),
		s2 = convertString(arg2);
	try {
		m += s1.split('.')[1].length;
	} catch (e) {}
	try {
		m += s2.split('.')[1].length;
	} catch (e) {}
	return (
		(Number(s1?.replace('.', '')) * Number(s2?.replace('.', ''))) /
		Math.pow(10, m)
	);
}

/*截取小数后面小数 采用向下取整的方式*/
export function dealNumber(number, length) {
	const newNumber = accMul(number, Math.pow(10, length));

	return (Math.floor(newNumber) / Math.pow(10, length)).toFixed(length);
}

/*截取小数后面小数 采用向上取整的方式*/
export function ceilNumber(number, length) {
	const newNumber = accMul(number, Math.pow(10, length));

	return (Math.ceil(newNumber) / Math.pow(10, length)).toFixed(length);
}

/*截取小数 不四舍五入的方式*/
export function unroundNumber(number, length) {
	let num = convertString(number);
	let index = num.indexOf('.');
	if (index === -1) {
		num = num.substring(0);
	} else {
		num = num.substring(0, length + index + 1);
	}

	return parseFloat(num).toFixed(length);
}

// 格式化日期
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
	return moment(date).format(format);
}