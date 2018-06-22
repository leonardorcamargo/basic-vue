<template>
	<div>
		<h1 class="centralizado">{{ titulo }}</h1>

		<p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
		<input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">
		<ul class="lista-fotos">
			<li class="lista-fotos-item" v-for="foto of fotosComFiltro">

				<meu-painel :titulo="foto.titulo">
					<imagem-responsiva :url="foto.url" :titulo="foto.titulo" 
						v-meu-transform:rotate.animate="12"/>
					<meu-botao 
						rotulo="remover" 
						tipo="button" 
						@botaoAtivado="remove(foto)" 
						:confirmacao="true"
						estilo="perigo"	/>
				</meu-painel>			
			</li>
		</ul>
	</div>
</template>

<script>
	import Painel from '../shared/painel/Painel.vue';
	import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
	import Botao from '../shared/botao/Botao.vue';
	import transform from '../../directives/Transform';
	
	export default {
		
		components: {

			'meu-painel': Painel,
			'imagem-responsiva': ImagemResponsiva,
			'meu-botao': Botao
		},

		directives: {
			'meu-transform': transform
		},

		methods: {

			remove(foto) {

				this.$http
					.delete(`http://localhost:3000/v1/fotos/${foto._id}`)
					.then(() => {
							this.mensagem = 'Foto removida com sucesso.';
							let indice = this.fotos.indexOf(foto);
							this.fotos.splice(indice,1);
						}, err => {
							console.log(err);
							this.mensagem = 'Nao foi possivel remover a foto';
						});
			}
		},
		
		data() {

			return {
				titulo: 'Alurapic',
				fotos: [],
				filtro: '',
				mensagem: ''
			}
		},
		
		computed: {

			fotosComFiltro() {
				if (this.filtro) {

					let reg = new RegExp(this.filtro.trim(), 'i');          
					return this.fotos.filter(foto => reg.test(foto.titulo));
				} else {

					return this.fotos;
				}
			}
		},
		
		created() {

			this.$http.get('http://localhost:3000/v1/fotos')
				.then(res => res.json())
				.then(fotos => this.fotos = fotos, err => console.log(err));
		}
	}
</script>

<style scoped>

	.centralizado {
		text-align: center;
	}

	.lista-fotos {
		list-style: none;
	}

	.lista-fotos .lista-fotos-item {
		display: inline-block;
	}

	.filtro {
		display: block;
		width: 100%;
	}
</style>
