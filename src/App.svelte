<script lang="ts">
  import Home from './Home.svelte'
  import { faHome, faClock } from "@fortawesome/free-solid-svg-icons";
  import { TabView, TabList, TabPanel, Tab } from "./lib/tabs.js";

  import "./App.css";
</script>

<header class="w-full p-3 text-center text-2xl font-semibold border-b border-gray-400">Beans</header>
<main>
  <TabView>
    <TabList>
      <Tab name="Home" icon={faHome} />
      <Tab name="Session" icon={faClock} />
    </TabList>
  
    <TabPanel>
      <Home/>
    </TabPanel>
  
    <TabPanel>
      <!-- <Session/> -->
    </TabPanel>
  </TabView>
</main>