<template>
  <a-layout-content style="margin: 0px 10px">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <a-page-header title="WeGet" />
      <a-divider style="margin: 0px" />
      <a-row style="margin: 10px 5%" align="middle">
        <a-list :grid="{ gutter: 16, column: 2 }" :data-source="header">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-card :title="item.title" :headStyle="{'font-weight': 'bold'}" hoverable>
              <div v-if="index === 0">
                <a-row>
                  <a-col :span="8" v-for="(summaryStat , index) in summaryStat" :key="index">
                  <a-statistic :title="summaryStat.title" :value="summaryStat.value"/>
                  </a-col>
                </a-row>
              </div>
               <div v-else v-for="(shopTotalCount , index) in shopTotalCount" :key="index">
                <a-statistic :title="shopTotalCount.title" :value="shopTotalCount.value" />
              </div>
            </a-card>
          </a-list-item>
        </a-list>
      </a-row>
      <a-row style="margin: 10px 5%" align="middle">
        <a-list :grid="{ gutter: 16, column: 3 }" :data-source="sataticsByMonth.records">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card :title="item.month + $t('labelMesseges.month')"
            :headStyle="{'font-weight': 'bold'}"
             hoverable
              ><a-statistic
                :title="$t('labelMesseges.soldTotalAmount')"
                :value="item.soldTotalAmount"
                :prefix="$t('labelMesseges.money')"
                :value-style="{ color: '#cf1322' }" />
              <a-statistic :title="$t('labelMesseges.soldTotalCount')" :value="item.soldTotalCount"
            /></a-card>
          </a-list-item>
        </a-list>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script>
export default {
  // 画面初期化
  created (){
    this.$axios.get("/top").then((response) => {
      this.header = [
          {
            title: this.$t('labelMesseges.memberCountHeader'),
          },
          {
            title: this.$t('labelMesseges.shopStatusHeader'),
          },
        ];
      // リスポンスデータ
      let resData = response.data[0].data;
      // 会員状況データ
      this.summaryStat = [
        {
          title: this.$t('labelMesseges.memberCount'),
          value: resData.addMemberCountByCurrentMonth
        },
        {
          title: this.$t('labelMesseges.addMemberCountByCurrentMonth'),
          value: resData.memberTotalCount
        },
        {
          title: this.$t('labelMesseges.quitMemberCountByCurrentMonth'),
          value: resData.quitMemberCountByCurrentMonth
        },
      ];
      // 店舗数設置
      this.shopTotalCount = [
        {
          title: this.$t('labelMesseges.shopCount'),
          value: resData.shopTotalCount
        },
      ]
      // 最近の月売り上げデータ設置
      this.sataticsByMonth = {
          records: resData.records
        };
    })
  },
  data() {
    return {
      header: [],
      // 会員状況データ
      summaryStat: [],
      // 店舗数
      shopTotalCount : [],
      // 最近の月売り上げデータ
      sataticsByMonth: {}
    };
  },
};
</script>