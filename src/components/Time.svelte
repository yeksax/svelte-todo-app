<script lang="ts">
	export let timeFormat: TimeFormat = "normal";
	export let date: Date;

	function getReadableTime(date: Date) {
		let readableTime = "";

		const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);

		if (timeFormat === "short") {
			if (weeks > 0) readableTime += `${weeks}w`;
			else if (days > 0) readableTime += `${days}d`;
			else if (hours > 0) readableTime += `${hours}h`;
			else if (minutes > 0) readableTime += `${minutes}min`;
			else readableTime += `${seconds}s`;
		} else if (timeFormat === "normal") {
			if (weeks > 0) readableTime += `${weeks}w`;
			else if (days > 0) readableTime += `${days}d`;
			else if (hours > 0)
				readableTime += `${hours}h${intToTimeFormat(minutes, 2)}min`;
			else if (minutes > 0)
				readableTime += `${minutes}min${intToTimeFormat(seconds, 2)}s`;
			else readableTime += `${seconds}s`;
		}

		readableTime += ". ago";
		return readableTime;
	}

	let readableTime = getReadableTime(date);

	setInterval(() => {
		readableTime = getReadableTime(date);
	}, 1000);
</script>

{readableTime}
