import NetworkProtocolCommand from '../../common/network-protocol-command.js';
import { ERROR_TYPE } from '../../../../constants/constants.js';

class NetworkGetCommand extends NetworkProtocolCommand {
    constructor(ctx) {
        super(ctx);
        this.operationService = ctx.getService;
        this.ualService = ctx.ualService;
        this.validationModuleManager = ctx.validationModuleManager;
        this.blockchainModuleManager = ctx.blockchainModuleManager;

        this.errorType = ERROR_TYPE.GET.GET_NETWORK_ERROR;
    }

    async getKeywords(command) {
        const { blockchain, contract, tokenId } = command.data;
        const locationHash = await this.ualService.calculateLocationHash(
            blockchain,
            contract,
            tokenId,
        );

        return [locationHash];
    }

    async getBatchSize() {
        return 2;
    }

    async getMinAckResponses() {
        return 1;
    }

    /**
     * Builds default networkGetCommand
     * @param map
     * @returns {{add, data: *, delay: *, deadline: *}}
     */
    default(map) {
        const command = {
            name: 'networkGetCommand',
            delay: 0,
            transactional: false,
        };
        Object.assign(command, map);
        return command;
    }
}

export default NetworkGetCommand;
