function Page() {
	return (
		<div className="flex h-screen w-screen flex-col items-center gap-10 bg-slate-300 py-10">
			<h1 className="text-2xl font-bold">Bifrost Coding Challenge</h1>
			<div className="flex flex-col gap-6">
				<div>Welcome to the Bifrost Coding Challenge!</div>
				<div>
					In this repo, you will find a few example components under:{' '}
					<pre className="code">/components/CodingChallenge</pre>
				</div>
				<div>
					The helper functions are under: <pre className="code">/lib/Helpers.ts</pre>
				</div>
				<div>
					I have also set up an API endpoint over at:
					<pre>/pages/api/CreateComponents.ts</pre>
				</div>
				<div>
					You can choose how you want to run your code though, and if you want to do anything with
					an API spec
				</div>
				<div>I wish you the best of luck!</div>
			</div>
		</div>
	);
}

export default Page;
