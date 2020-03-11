import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdiSvg',
	},
	theme: {
		themes: {
			light: {
				primary: colors.blue,
				secondary: colors.blue.lighten2,
				accent: colors.amber.base
			}
		}
	}
});
