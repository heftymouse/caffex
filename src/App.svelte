<script lang="ts">
    import TabView from "./lib/TabView.svelte";
    import Tab from "./lib/Tab.svelte";
    import Router from "svelte-spa-router";
    import wrap from "svelte-spa-router/wrap"
    import { faHome, faClock } from "@fortawesome/free-solid-svg-icons";
    import { pageName } from "./lib/stores";

    import "./App.css";

    const routes = {
        '/': wrap({
            asyncComponent: () => import('./Home.svelte')
        }),
        '/onboarding': wrap({
            asyncComponent: () => import('./Onboarding.svelte')
        }),
        '/session': wrap({
            asyncComponent: () => import('./Session.svelte')
        }),
        '*': wrap({
            asyncComponent: () => import('./Home.svelte')
        })
    };
</script>

<svelte:head>
    <title>{`${$pageName} - Caffex`}</title>
</svelte:head>

<header class="w-full p-3 text-center text-2xl font-semibold border-b border-gray-400 sticky top-0 bg-white">Caffex</header>
<main>
    <Router {routes}/>
    <TabView>
        <Tab name="Home" icon={faHome} route=""/>
        <Tab name="Session" icon={faClock} route="session"/>
    </TabView>
</main>
