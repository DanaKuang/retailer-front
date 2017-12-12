<template>
	<div class="datetimepicker">
		<mt-datetime-picker
			v-model="pickerVisible"
			type="date"
			year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日">
		</mt-datetime-picker>
	</div>
</template>
<script>
export default {
	name: 'date-time',
    methods: {
      	openPicker() {
        	this.$refs.picker.open();
      	}
    }
 }
</script>