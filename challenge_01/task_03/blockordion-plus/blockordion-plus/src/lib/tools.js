
function blockEditor() {
	const select = wp.data.select('core/block-editor');
	const dispatch = wp.data.dispatch('core/block-editor');

	function getBlockHierarchyRootClientId(clientId) {
		return select.getBlockHierarchyRootClientId(clientId);
	}

	function getBlockIndex(clientId) {
		return select.getBlockIndex(clientId);
	}

	function insertBlocks(block, blockIndex, rootClientId){
		dispatch.insertBlocks(block, blockIndex, rootClientId);
	}

	return {
		getBlockHierarchyRootClientId,
		getBlockIndex,
		insertBlocks
	};

}


export {
	blockEditor
}
