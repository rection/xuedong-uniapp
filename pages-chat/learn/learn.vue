<template>
  <view class="container">
    <view v-if="loading">加载单词中...</view>

    <view v-else-if="currentWord" class="card">
      <text class="word">{{ currentWord.word }}</text>
      <text class="phonetic">/{{ currentWord.phonetic }}/</text>
      
      <view class="definition-box">
        <text v-if="showDefinition" class="definition">{{ currentWord.translation }}</text>
        <view v-else class="mask" @click="showDefinition = true">点击查看释义</view>
      </view>

      <view class="action-area" v-if="showDefinition">
        <button type="warn" @click="handleResult(0)">不认识 (陌生)</button>
        <button type="primary" @click="handleResult(1)">认识 (已掌握)</button>
      </view>
    </view>

    <view v-else>
      <text>今日任务已完成！🎉</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const db = uniCloud.database()
const currentWord = ref(null)
const showDefinition = ref(false)
const loading = ref(true)

// 1. 获取一个“我没背过”或者“该复习”的单词
const fetchNextWord = async () => {
  loading.value = true
  showDefinition.value = false
  
  try {
    // 逻辑 A：先查记录表，找该复习的词（这里简化为先只找新词）
    // 实际项目中，这里应该先查询 user_word_records 表
    
    // 逻辑 B：如果没有该复习的，就从 dict_cet4 随机拿一个没背过的
    // 使用 JQL 的联表查询或临时表方案（这里演示最简单的随机抽取方案）
    const res = await db.collection('dict_cet4')
      .limit(1)
      .get({ getOne: true }) // 随机获取一个，实际需配合 .sample() 或 skip
      
    // *注意：真实场景需过滤掉 user_word_records 中已存在的 word_id*
    
    if (res.result.data) {
      currentWord.value = res.result.data
    } else {
      currentWord.value = null
    }
  } catch (e) {
    console.error('获取失败', e)
    uni.showToast({ title: '网络错误', icon: 'none' })
  } finally {
    loading.value = false
  }
}

// 2. 提交学习结果
const handleResult = async (status) => {
  // status: 0 (不认识), 1 (认识)
  
  // 简单算法：如果是“不认识”，下次复习时间是 5 分钟后；“认识”则是 1 天后
  const nextReview = status === 0 ? Date.now() + 300000 : Date.now() + 86400000
  
  try {
    // 写入或更新云端数据库
    await db.collection('user_word_records').add({
      word_id: currentWord.value._id,
      status: status,
      next_review_time: nextReview,
      create_date: Date.now()
    })
    
    uni.showToast({ title: status === 1 ? '太棒了' : '继续加油', icon: 'none' })
    
    // 自动跳下一个
    fetchNextWord()
    
  } catch (e) {
    console.error('保存进度失败', e)
  }
}

onMounted(() => {
  fetchNextWord()
})
</script>

<style>
/* 简单的样式 */
.container { padding: 40px; text-align: center; }
.word { font-size: 40px; font-weight: bold; display: block; margin-bottom: 10px; }
.phonetic { color: #666; font-family: monospace; display: block; margin-bottom: 30px; }
.mask { background: #eee; padding: 20px; color: #999; border-radius: 8px; }
.action-area { margin-top: 40px; display: flex; gap: 20px; }
</style>