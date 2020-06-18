import _ from "lodash";
import moment from "moment";
import marked from "marked/lib/marked.js";
import { categories } from "@/constants";
import firebase from "firebase";

export default {
  beforeRouteLeave(to, from, next) {
    if (this.isEdited) {
      const answer = window.confirm(
        "行った変更が保存されない可能性があります。"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  data: () => ({
    isEdited: false
  }),
  methods: {
    formatDate(date, format) {
      if (
        (!_.isDate(date) && _.isEmpty(date)) ||
        date.toLocaleString().indexOf("Timestamp") === -1
      ) {
        return "";
      }
      let m = moment(date.toDate());
      if (format === undefined) {
        return m.format("YYYY/MM/DD HH:mm");
      } else {
        return m.format(format);
      }
    },
    getCategoryColor(categoryId) {
      return this.findCategoryById(categoryId).color;
    },
    formatCategory(categoryId) {
      return this.findCategoryById(categoryId).categoryNm;
    },
    findCategoryById(categoryId) {
      return categories.find((category) => categoryId === category.categoryId);
    },
    handler(event) {
      event.returnValue = "行った変更が保存されない可能性があります。";
    },
    startEdit() {
      this.isEdited = true;
    },
    endEdit() {
      this.isEdited = false;
    },
    gaEvent(action) {
      firebase
        .analytics()
        .logEvent(`uid ${this.getLoginUser.uid} ${action}`);
    }
  },
  computed: {},
  watch: {
    isEdited() {
      if (this.isEdited) {
        window.addEventListener("beforeunload", this.handler);
      } else {
        window.removeEventListener("beforeunload", this.handler);
      }
    },
  },
  mounted() {
    let title = this.$route !== undefined ? this.$route.meta.title : undefined;
    if (title !== undefined) {
      document.title = `${title} - postingBoard`;
    } else {
      document.title = "postingBoard";
    }
  },
  created() {
    marked.setOptions({ breaks: true });
    window.removeEventListener("beforeunload", this.handler);
  },
  destroyed() {},
};
