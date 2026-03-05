// ═══════════════════════════════════════════════════
// Google Business API Mock Service
// ═══════════════════════════════════════════════════
// Simulates PATCH requests to the Google Business
// Information API (locations.patch endpoint).

import { STATUS } from '../constants';

const API_LATENCY_MS = 800;

/**
 * Mock PATCH to Google Business Profile API.
 * Simulates: PATCH https://mybusinessbusinessinformation.googleapis.com/v1/locations/{locationId}
 *
 * @param {string} locationId
 * @param {string} newStatus - 'OPEN' or 'CLOSED'
 * @param {object} mfaResult - verified MFA payload
 * @returns {Promise<object>} API response
 */
export async function patchBusinessStatus(locationId, newStatus, mfaResult) {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, API_LATENCY_MS));

    if (!mfaResult?.isMFAVerified) {
        throw new Error('UNAUTHORIZED: MFA verification required before state mutation.');
    }

    if (![STATUS.OPEN, STATUS.CLOSED].includes(newStatus)) {
        throw new Error(`INVALID_STATUS: Expected OPEN or CLOSED, received: ${newStatus}`);
    }

    // Mock successful response payload
    const response = {
        success: true,
        data: {
            name: `locations/${locationId}`,
            title: 'ShopSwitch Demo Store',
            openInfo: {
                status: newStatus,
                canReopen: newStatus === STATUS.CLOSED,
            },
            metadata: {
                updatedAt: new Date().toISOString(),
                updateMask: 'openInfo.status',
                authMethod: mfaResult.method,
                apiVersion: 'v1',
                latencyMs: API_LATENCY_MS,
            },
        },
        headers: {
            'x-request-id': `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            'x-rpc-status': 'OK',
        },
    };

    return response;
}

/**
 * Mock GET current business status.
 * @param {string} locationId
 * @returns {Promise<object>}
 */
export async function getBusinessStatus(locationId) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        name: `locations/${locationId}`,
        title: 'ShopSwitch Demo Store',
        openInfo: {
            status: STATUS.OPEN,
        },
        storefrontAddress: {
            addressLines: ['MG Road, Bengaluru'],
            locality: 'Bengaluru',
            administrativeArea: 'Karnataka',
            postalCode: '560001',
            regionCode: 'IN',
        },
    };
}
