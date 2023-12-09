<template>
  <v-row>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Cars",
  data() {
    return {
      // imgDefPath: require("@/assets/default_car.jpg"),
      loading: true,
      page: 1,
      pageCount: 14,
      request: {
        limit: 5,
        offset: 0
      },
      cars: [],
      categories: [],
      formKey: 1,
      itemsPerPage: 5,
      dateSettings: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    }
  },
  computed: {
    orderHeaders () {
      return [
        {
          value: "photo",
          text: "Фото",
          searchable: false,
          sortable: false,
          width: "10%"
        },
        {
          value: "info",
          text: "Инфо",
          sortable: false,
          width: "18%"
        },
        {
          value: "car",
          text: "Доп.",
          searchable: false,
          sortable: false,
          width: "18%"
        },
        {
          value: "colors",
          text: "Цены и цвета",
          searchable: false,
          sortable: false,
          width: "18%"
        },
        {
          value: "createdAt",
          text: "Дата создания",
          width: "18%"
        },
        {
          value: "carCard",
          text: "",
          searchable: false,
          sortable: false,
          width: "18%"
        }
      ]
    },
    ...mapGetters("entities",
      [
        "getCars",
        "getCar",
        "getCategories"
      ])
  },
  watch: {
    itemsPerPage: function (newVal) {
      this.request.limit = newVal;
      this.pageCount = 70 / newVal;
      this.page = 1;
    },
    page: function (newVal) {
      this.request.offset = newVal * this.request.limit;
      this.fetchRows();
    },
    getCar: {
      handler (newVal) {
        if (!newVal) {
          this.fetchRows();
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.getCar) {
      this.setCar(null);
    }
    if (this.getCategories.length === 0) {
      this.fetchCategories().then(() => {
        this.categories = this.getCategories;
      });
    } else {
      this.categories = this.getCategories;
    }
    if (this.getCars.length === 0) {
      this.fetchRows();
    } else {
      this.cars = this.getCars;
    }
  },
  methods: {
    ...mapMutations('entities', ['setCar']),
    ...mapActions("entities",
      [
        "fetchCars",
        "fetchCategories",
        "deleteEntity"
      ]),
    getImgPath(car) {
      if (typeof(car) != "undefined" && car !== null) {
        if (car.thumbnail.path.length > 1000) {
          return car.thumbnail.path;
        } else return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
      } else return this.imgDefPath;
    },
    formatDate (date) {
      return new Date(date).toLocaleString([], this.dateSettings);
    },
    truncate (string, limit) {
      if(string.length > limit){
        return string.substring(0,limit)+"...";
      }
      else {
        return string;
      }
    },
    getItemPerPage(val) {
      this.itemsPerPage = val;
    },
    defaultImage(e) {
      e.target.src = this.imgDefPath;
    },
    fetchRows() {
      this.loading = true;
      this.fetchCars(this.request).then(() => {
        this.loading = false;
        this.cars = this.getCars;
      });
    }
  }
};
</script>