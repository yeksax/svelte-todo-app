export function highlightMatch(str: string, filter: string) {
	let lowerStr = str.toLowerCase();
	let lowerFilter = filter.toLowerCase();

	let findIndex = lowerStr.indexOf(lowerFilter);
	let res = "";

	if (findIndex !== -1 && filter.length > 0) {
		res += str.slice(0, findIndex);
		res += `<strong>${str.slice(
			findIndex,
			filter.length + findIndex
		)}</strong>`;
		res += str.slice(findIndex + filter.length);
	} else {
		res = str;
	}

	return res;
}
