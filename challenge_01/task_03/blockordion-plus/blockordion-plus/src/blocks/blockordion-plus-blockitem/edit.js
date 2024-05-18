import {__} from '@wordpress/i18n';
import {useRef, useEffect, useContext, useState} from "react";
import {RichText, InnerBlocks, useBlockProps, BlockControls} from '@wordpress/block-editor';
import {DropdownMenu, Toolbar, ToolbarGroup} from "@wordpress/components";
import {blockEditor} from "../../lib/tools.js";
import {plusCircleFilled} from '@wordpress/icons';

import {
	arrowUp,
	arrowDown,
	moreVertical,
	trash
} from '@wordpress/icons';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	const {className, ...blockProps} = useBlockProps({
		className: "blockordion__item"
	})

	const refItem = useRef();
	const refArticle = useRef();
	const refTitle = useRef();
	const refBlockordionContent = useRef();
	const refBtnExpandable = useRef();

	const {
		clientId,
		insertBlocksAfter,
		attributes,
		setAttributes
	} = props;

	const {isExpanded} = attributes;

	const ALLOWED_BLOCKS = wp.blocks.getBlockTypes()
		.map(block => block.name)
		.filter(blockName => {
			return (blockName !== 'imandresi/blockordion-plus') &&
				(blockName !== 'imandresi/blockordion-plus-blockitem');
		});

	/**
	 * Adjust the item height if it is expanded
	 */
	function adjustContentHeight() {
		// const isExpanded = refBtnExpandable.current.classList.contains('blockordion__expanded');
		const articleHeight = (refArticle.current.clientHeight + 55) + 'px';

		if (isExpanded) {
			if (refBlockordionContent.current.style.height !== 'auto') {
				refBlockordionContent.current.style.height = articleHeight;
				setTimeout(() => {
					refBlockordionContent.current.style.height = 'auto';
				}, 600);
			}
		} else {
			const contentHeight = (refBlockordionContent.current.clientHeight) + 'px';
			refBlockordionContent.current.style.height = contentHeight;
			setTimeout(() => {
				refBlockordionContent.current.style.height = '';
			}, 100);
		}


	}


	/**
	 * Manage expand/collapse of each accordion item
	 *
	 * @param e
	 */
	function blockordionToggle(e) {
		const btnExpandableEl = e.target;
		const expandedValue = !isExpanded;

		if (expandedValue) {
			btnExpandableEl.classList.remove('blockordion__expanded');
		} else {
			btnExpandableEl.classList.add('blockordion__expanded');
		}

		setAttributes({isExpanded: expandedValue});
	}

	/**
	 * Various Initializations
	 */
	useEffect(() => {
		adjustContentHeight();
	});

	/**
	 * Toolbar Dropdown item menu
	 */
	function addItemAbove() {
		const rootClientId = blockEditor().getBlockHierarchyRootClientId(clientId);
		const clientIndex = blockEditor().getBlockIndex(clientId);
		const block = wp.blocks.createBlock(
			'imandresi/blockordion-plus-blockitem', {}
		);

		blockEditor().insertBlocks(block, clientIndex, rootClientId);
	}

	function addItemBelow() {
		if (!insertBlocksAfter) return;
		const block = wp.blocks.createBlock(
			'imandresi/blockordion-plus-blockitem', {}
		);
		insertBlocksAfter(block);
	}

	const dropdownMenuControls = [
		{
			title: 'Add New Item Above',
			icon: arrowUp,
			onClick: addItemAbove
		},
		{
			title: 'Add New Item Below',
			icon: arrowDown,
			onClick: addItemBelow
		}
	];

	return (
		<section className={className} {...blockProps}>
			<BlockControls>
				<Toolbar>
					<DropdownMenu
						className=""
						icon={plusCircleFilled}
						label="Add new item in Blockordion"
						controls={dropdownMenuControls}
					></DropdownMenu>
				</Toolbar>
			</BlockControls>

			<header>
				<RichText
					tagName="div"
					className="blockordion__title"
					placeholder="Title of the item"
					allowedFormats={[]}
					value={attributes.title}
					onChange={title => {
						setAttributes({title})
					}}
				/>
				<div className="blockordion__navbar">
					<div className={
						"blockordion__button blockordion__expandable" +
						(isExpanded ? " blockordion__expanded" : "")}
						 onClick={blockordionToggle}
						 ref={refBtnExpandable}
					></div>

				</div>

			</header>
			<div className="blockordion__content"
				 ref={refBlockordionContent}>

				<article ref={refArticle}>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={[
							['core/paragraph', {placeholder: 'Please type the content of the item here...'}]
						]}
					/>
				</article>
			</div>

		</section>
	);
}
