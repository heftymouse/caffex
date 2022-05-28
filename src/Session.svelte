<script lang="ts">
    import { beforeUpdate } from 'svelte';

    beforeUpdate(() => {
        if(!localStorage.getItem("age") || !localStorage.getItem("weight")) {
            window.location.hash = "#/onboarding";
        }
    })
</script>

<header class="main-header">Session</header>
<br><br><br> <!--halp-->
<div class="flex flex-col text-3xl justify-center items-center pt-2">
</div>
