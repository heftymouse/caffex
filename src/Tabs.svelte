<script lang="ts">
    import {faHome, faClock} from '@fortawesome/free-solid-svg-icons'
    import { TabView, TabList, TabPanel, Tab } from './tab/tabs.ts';
    import Home from "./Home.svelte";
    import Session from "./Session.svelte";
</script>

<TabView>
    <TabList>
        <Tab name="Home" icon={faHome}/>
        <Tab name="Session" icon={faClock}/>
    </TabList>

    <TabPanel>
        <Home/>
    </TabPanel>

    <TabPanel>
        <Session/>
    </TabPanel>
</TabView>
