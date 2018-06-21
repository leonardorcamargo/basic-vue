import Vue from 'vue';

Vue.directive('meu-transform', {

	bind(el, binding, vnode) {
		let rotate = 90;
		let animate = false;

		if (binding) {
			rotate = binding.value.rotate || 90;
			animate = binding.value.animate || false;
		}

		let current = 0;
		el.addEventListener('dblclick',function() {

			current += rotate;
			this.style.transform = `rotate(${current}deg)`;

			if (animate){
				this.style.transition = "transform 0.5s";
			}
		})
	}
});