// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/lodash` if it exists or ad... Remove this comment to see the full error message
import _ from "lodash";
import moment from "moment";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/marked` if it exists or ad... Remove this comment to see the full error message
import marked from "marked/lib/marked.js";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/constants' or its correspond... Remove this comment to see the full error message
import { categories } from "@/constants";
import firebase from "firebase";

export default {
  beforeRouteLeave(to: any, from: any, next: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isEdited' does not exist on type '{ befo... Remove this comment to see the full error message
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
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isEdited' does not exist on type '{ form... Remove this comment to see the full error message
      this.isEdited = true;
    },
    endEdit() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isEdited' does not exist on type '{ form... Remove this comment to see the full error message
      this.isEdited = false;
    },
    gaEvent(message: any) {
      firebase.analytics().logEvent(`${message}`);
    },
  },
  computed: {},
  watch: {
    isEdited() {
      // @ts-expect-error ts-migrate(2774) FIXME: This condition will always return true since the f... Remove this comment to see the full error message
      if (this.isEdited) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handler' does not exist on type '{ isEdi... Remove this comment to see the full error message
        window.addEventListener("beforeunload", this.handler);
      } else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handler' does not exist on type '{ isEdi... Remove this comment to see the full error message
        window.removeEventListener("beforeunload", this.handler);
      }
    },
  },
  mounted() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '$route' does not exist on type '{ before... Remove this comment to see the full error message
    let title = this.$route !== undefined ? this.$route.meta.title : undefined;
    if (title !== undefined) {
      document.title = `${title} - postingBoard`;
    } else {
      document.title = "postingBoard";
    }
  },
  created() {
    marked.setOptions({ breaks: true });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handler' does not exist on type '{ befor... Remove this comment to see the full error message
    window.removeEventListener("beforeunload", this.handler);
  },
  destroyed() {},
};
