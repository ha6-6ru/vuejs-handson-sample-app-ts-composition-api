export default {
  created: function() {
    console.log(this.$options.name, 'created');
  },
  mounted: function() {
    console.log(this.$options.name, 'mounted');
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
