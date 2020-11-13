<template>
  <a-layout-sider v-model="collapsed" collapsible>
    <div class="logo" />
    <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
      <a-menu-item key="1" style="margin-top: 0" @click="toTopPage">
        <a-icon type="pie-chart" />
        <span>トップページ</span>
      </a-menu-item>

      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="pay-circle" /><span>売り上げ状況</span></span>
        <a-menu-item key="1" @click="toProductsList"> 売上高一覧 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="user" /><span>会員管理</span></span>
        <a-menu-item key="1" > 会員一覧 </a-menu-item>
        <a-menu-item key="2" > 統計情報 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="solution" /><span>出品者管理</span></span>
        <a-menu-item key="1" > 申込一覧 </a-menu-item>
        <a-menu-item key="2" > 出品者一覧 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="bars" /><span>マスター管理</span></span>
        <a-menu-item key="1" > バーナー管理 </a-menu-item>
        <a-menu-item key="2" > カテゴリー管理 </a-menu-item>
        <a-menu-item key="3" > タグ管理 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub5">
        <span slot="title"><a-icon type="team" /><span>スタッフ管理</span></span>
        <a-menu-item key="1" > スタッフ登録 </a-menu-item>
        <a-menu-item key="2" > スタッフ編集 </a-menu-item>
        <a-menu-item key="3" > スタッフ一覧 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub6">
        <span slot="title"><a-icon type="setting" /><span>システム設定</span></span>
        <a-menu-item key="1" > 利用規約設定 </a-menu-item>
        <a-menu-item key="2" > プライバシーポリシー設定 </a-menu-item>
        <a-menu-item key="3" > メール設定 </a-menu-item>
        <a-menu-item key="3" > 税率設定 </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toTopPage() {
      this.$emit("replaceContent", true);
      this.$router.push({
        name: "topPage",
      });
    },
    toProductsList() {
      this.$emit("replaceContent", false);
      this.$router.push({
        name: "productsList",
      });
    },
    toProductAdd() {
      this.$emit("replaceContent", false);
      this.$router.push({
        name: "productAdd",
      });
    },
    toProductsAdd() {
      this.$emit("replaceContent", false);
      this.$router.push({
        name: "productsAdd",
      });
    },
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>