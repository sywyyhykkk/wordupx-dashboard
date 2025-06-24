<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { ListColumn, ListTable } from '@visactor/vue-vtable';
import { fetchAllUsers } from '@/service/api';

defineOptions({
  name: 'UserData'
});

const listRecords = ref<App.WordUpx.User[]>();

onMounted(async () => {
  const { data } = await fetchAllUsers();

  if (data) {
    listRecords.value = data.map(item => {
      return {
        ...item,
        created_at: dayjs(item.created_at).format('YYYY-MM-DD hh:mm:ss')
      };
    });
  }
});
</script>

<template>
  <NSpace vertical :size="16">
    <NCard>Some filters</NCard>
    <NCard :bordered="false">
      <ListTable :options="{}" :records="listRecords" height="400px">
        <ListColumn field="username" :title="$t('table.user.username')" width="auto" />
        <ListColumn field="email" :title="$t('table.user.email')" width="auto" />
        <ListColumn field="created_at" :title="$t('table.common.createdAt')" width="auto" />
      </ListTable>
    </NCard>
  </NSpace>
</template>
