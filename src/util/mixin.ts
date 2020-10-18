import _ from "lodash";
import moment from "moment";
import marked from "marked/lib/marked.js";
import { categories } from "@/constants";
import firebase from "firebase";

export default {
  beforeRouteLeave(to: any, from: any, next: any) {
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
    isEdited: false,
  }),
  methods: {
    formatDate(date: any, format: any) {
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
    getCategoryColor(categoryId: any) {
      return this.findCategoryById(categoryId).color;
    },
    formatCategory(categoryId: any) {
      return this.findCategoryById(categoryId).categoryNm;
    },
    findCategoryById(categoryId: any) {
      return categories.find((category: any) => categoryId === category.categoryId);
    },
    handler(event: any) {
      event.returnValue = "行った変更が保存されない可能性があります。";
    },
    startEdit() {
      this.isEdited = true;
    },
    endEdit() {
      this.isEdited = false;
    },
    gaEvent(message: any) {
      firebase.analytics().logEvent(`${message}`);
    },
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
