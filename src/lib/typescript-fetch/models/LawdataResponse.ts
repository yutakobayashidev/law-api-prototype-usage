/* tslint:disable */
/* eslint-disable */
/**
 * 法令APIプロトタイプ
 * 法令データを取得・検索するAPIです。  * 必ずデジタル庁の<a href=\"https://www.digital.go.jp/policies/legal-practice/public-test\" target=\"_blank\">法令APIプロトタイプ公開テストのページ</a>をご確認頂き、利用規約に同意頂いた上でご利用ください。  * 本プロトタイプは、一時的な試験提供ですので、実際のシステムへの組み込み等についてはお控えください。実際のサービス提供への活用を頂くには、正式提供している<a href=\"https://elaws.e-gov.go.jp/apitop/\" target=\"_blank\">現行の法令API</a>、もしくは今後検討している高度化後の法令APIをご利用頂く必要があることにご留意ください。  * 使用するデータは、テスト用データのため、一部含まれない法令や、法令標準XMLスキーマには無い属性や項目が含まれていることがあります。  * 本環境はサーバーメンテナンスを行うことがあり、メンテナンス中はご利用がいただけない事があります。長期間の停止を伴うサーバーメンテナンスを行う際はデジタル庁HPでお知らせ致します。また、API仕様についても、公開テスト期間中に変更される可能性がありますので、ご了承ください。 
 *
 * The version of the OpenAPI document: 2.1.77
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AttachedFilesInfo } from './AttachedFilesInfo';
import {
    AttachedFilesInfoFromJSON,
    AttachedFilesInfoFromJSONTyped,
    AttachedFilesInfoToJSON,
} from './AttachedFilesInfo';
import type { LawInfo } from './LawInfo';
import {
    LawInfoFromJSON,
    LawInfoFromJSONTyped,
    LawInfoToJSON,
} from './LawInfo';
import type { RevisionInfo } from './RevisionInfo';
import {
    RevisionInfoFromJSON,
    RevisionInfoFromJSONTyped,
    RevisionInfoToJSON,
} from './RevisionInfo';

/**
 * 法令本文取得APIレスポンス
 * @export
 * @interface LawdataResponse
 */
export interface LawdataResponse {
    /**
     * 法令本文
     * @type {string}
     * @memberof LawdataResponse
     */
    lawFullText?: string;
    /**
     * 
     * @type {AttachedFilesInfo}
     * @memberof LawdataResponse
     */
    attachedFilesInfo?: AttachedFilesInfo;
    /**
     * 
     * @type {LawInfo}
     * @memberof LawdataResponse
     */
    lawInfo?: LawInfo;
    /**
     * 
     * @type {RevisionInfo}
     * @memberof LawdataResponse
     */
    revisionInfo?: RevisionInfo;
}

/**
 * Check if a given object implements the LawdataResponse interface.
 */
export function instanceOfLawdataResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LawdataResponseFromJSON(json: any): LawdataResponse {
    return LawdataResponseFromJSONTyped(json, false);
}

export function LawdataResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LawdataResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lawFullText': !exists(json, 'law_full_text') ? undefined : json['law_full_text'],
        'attachedFilesInfo': !exists(json, 'attached_files_info') ? undefined : AttachedFilesInfoFromJSON(json['attached_files_info']),
        'lawInfo': !exists(json, 'law_info') ? undefined : LawInfoFromJSON(json['law_info']),
        'revisionInfo': !exists(json, 'revision_info') ? undefined : RevisionInfoFromJSON(json['revision_info']),
    };
}

export function LawdataResponseToJSON(value?: LawdataResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'law_full_text': value.lawFullText,
        'attached_files_info': AttachedFilesInfoToJSON(value.attachedFilesInfo),
        'law_info': LawInfoToJSON(value.lawInfo),
        'revision_info': RevisionInfoToJSON(value.revisionInfo),
    };
}

