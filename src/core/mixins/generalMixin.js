export default {
   methods :{
      amountFormatter(val) {
         return Intl.NumberFormat().format(val);
      },
      convertToHumanReadable(s) {
            let min = Math.floor(s / 60);
            let sec = s % 60;
            return min + ':' + sec;
      }
   },
   filters: {
      amountFormatter(val) {
         return Intl.NumberFormat().format(val);
      }
   }
}