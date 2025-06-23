<script lang="ts">
    import API from '@/api';
    
    const requestRes = async () => {
        let result = await API.login('zhangsan', '123456');
        console.log('%c [ result ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', result)
    }

</script>


<template>
    <div>login</div>
</template>
