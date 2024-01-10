<script>
	import Build from "$lib/components/keyboards/Build.svelte"	
	
	export let builds;

	let builds_with_labels = builds.map(b => {
		if (b.switches instanceof Array) {
			let switches
			let names = b.switches
				.map(s => s.name)
				.filter((value, index, array) => array.indexOf(value) === index)
			if (names.length > 1)	{
				switches = names.join(", ")
			} else {
				switches = names[0]
			}
			return {
				label: `Build w\/	${switches}`,
				build: b
			}
		} else {
			return {
				label: `Build w\/ ${b.switches.name}`,
				build: b
			}
		}
	})
	let currentBuild = builds[0]

	const handleClick = build => () => (currentBuild = build);
</script>

{#if builds.length > 1}
	<ul>
		{#each builds_with_labels as build}
			<li class={currentBuild === build.build ? 'active' : ''}>
				<span on:keypress={handleClick(build.build)} on:click={handleClick(build.build)}>
					{build.label}
				</span>
			</li>
		{/each}
	</ul>
{/if}
{#each builds_with_labels as build}
	{#if currentBuild == build.build}
		<div class="box">
			<Build build={currentBuild} />
		</div>
	{/if}
{/each}

<style>
	.box {
		margin-bottom: 10px;
		padding: 40px;
		border: 1px solid #dee2e6;
    border-radius: 0 0 .5rem .5rem;
    border-top: 0;
	}
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
  }
	li {
		margin-bottom: -1px;
	}

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style>
