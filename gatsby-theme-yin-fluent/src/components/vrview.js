import React, { useState } from "react"
import {
    ActionButton, PrimaryButton, DefaultButton, DialogType, Dialog, DialogFooter, ProgressIndicator
} from 'office-ui-fabric-react'
import { useBoolean } from '@uifabric/react-hooks';
const VRViewBtn = () => {
    const dialogStyles = { main: { maxWidth: 450 } };
    const dialogContentProps = {
        type: DialogType.normal,
        title: '确定要进入 VR 模式吗？',
        closeButtonAriaLabel: '关闭',
        subText: '这需要您具有 VR 硬件。',
    };
    const dialogContentLoadingProps = {
        type: DialogType.normal,
        title: '请稍后',
        subText: '正在装载 VR 世界...',
        showCloseButton: false
    };
    const vrIcon = { iconName: 'CubeShape' };
    const [displayCanvas, setDisplayCanvas] = useState({ display: 'none' })
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const [hideLoadingDialog, { toggle: toggleHideLoadingDialog }] = useBoolean(true);
    const [isInVrMode, { toggle: toggleInVrMode }] = useBoolean(false); //还没实现 先默认 true
    const modalProps = {
          isBlocking: false,
          styles: dialogStyles,
    }
    const loadingModalProps = {
        isBlocking: true,
        styles: dialogStyles,
    }
    const [vrModeText, setVrModeText] = useState("使用 VR 模式浏览")
    const doVrAndHide = () => {
        toggleHideDialog()
        toggleHideLoadingDialog()
        //TODO
        setTimeout(() => {
            toggleHideLoadingDialog()
            toggleInVrMode()
            setDisplayCanvas({ display: '' })
            setVrModeText("已启用 VR 模式") // TODO
            setVrModeText("真可惜 这个功能还没实现") // TODO
        }, 5000);
    }
    return (
    <>
    <ActionButton iconProps={vrIcon} allowDisabledFocus onClick={toggleHideDialog} disabled={isInVrMode}>
      {vrModeText}
    </ActionButton>
    <p className="ly-width100" style={displayCanvas}>
        <canvas width={240} height={120}></canvas>
    </p>
    <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={doVrAndHide} text="进入 VR 模式" />
          <DefaultButton onClick={toggleHideDialog} text="取消" />
        </DialogFooter>
      </Dialog>
      <Dialog
        hidden={hideLoadingDialog}
        onDismiss={toggleHideLoadingDialog}
        dialogContentProps={dialogContentLoadingProps}
        modalProps={loadingModalProps}
      >
          <ProgressIndicator description={'真可惜 这个功能还没实现'} />
      </Dialog>
    </>)
}

export default VRViewBtn