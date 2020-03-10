import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

// export default new Vuetify({
// 	theme: {
// 		themes: {
// 			light: {
// 				primary: colors.blue.darken1,
// 				secondary: colors.blue.lighten4,
// 				accent: colors.amber.base
// 			},
// 		},
// 	},
// });

const opts = {};

export default new Vuetify(opts);