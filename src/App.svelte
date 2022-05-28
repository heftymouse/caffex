<script lang="ts">
    import { faHome, faClock } from "@fortawesome/free-solid-svg-icons";
    import TabView from "./lib/TabView.svelte";
    import Tab from "./lib/Tab.svelte";
    import Router from "svelte-spa-router";
    import wrap from "svelte-spa-router/wrap"

    import "./App.css";
    import Onboarding from "./Onboarding.svelte";

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

<header class="main-header">Beans</header>
<main>
    <Router {routes}/>
    <TabView>
        <Tab name="Home" icon={faHome} route=""/>
        <Tab name="Session" icon={faClock} route="session"/>
    </TabView>
</main>
