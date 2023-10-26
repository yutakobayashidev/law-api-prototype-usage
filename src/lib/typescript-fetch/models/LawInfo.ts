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
import type { Era } from './Era';
import {
    EraFromJSON,
    EraFromJSONTyped,
    EraToJSON,
} from './Era';
import type { LawType } from './LawType';
import {
    LawTypeFromJSON,
    LawTypeFromJSONTyped,
    LawTypeToJSON,
} from './LawType';

/**
 * 履歴に依存しない法令（法令IDで特定される法令）のメタ情報
 * @export
 * @interface LawInfo
 */
export interface LawInfo {
    /**
     * 
     * @type {LawType}
     * @memberof LawInfo
     */
    lawType?: LawType;
    /**
     * 法令ID
     * @type {string}
     * @memberof LawInfo
     */
    lawId?: string;
    /**
     * 法令番号
     * @type {string}
     * @memberof LawInfo
     */
    lawNum?: string;
    /**
     * 
     * @type {Era}
     * @memberof LawInfo
     */
    lawNumEra?: Era;
    /**
     * 法令番号の年
     * @type {number}
     * @memberof LawInfo
     */
    lawNumYear?: number;
    /**
     * 
     * @type {LawType}
     * @memberof LawInfo
     */
    lawNumType?: LawType;
    /**
     * 法令番号の号数
     * @type {string}
     * @memberof LawInfo
     */
    lawNumNum?: string;
    /**
     * 公布日
     * @type {Date}
     * @memberof LawInfo
     */
    promulgationDate?: Date;
}

/**
 * Check if a given object implements the LawInfo interface.
 */
export function instanceOfLawInfo(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LawInfoFromJSON(json: any): LawInfo {
    return LawInfoFromJSONTyped(json, false);
}

export function LawInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LawInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lawType': !exists(json, 'law_type') ? undefined : LawTypeFromJSON(json['law_type']),
        'lawId': !exists(json, 'law_id') ? undefined : json['law_id'],
        'lawNum': !exists(json, 'law_num') ? undefined : json['law_num'],
        'lawNumEra': !exists(json, 'law_num_era') ? undefined : EraFromJSON(json['law_num_era']),
        'lawNumYear': !exists(json, 'law_num_year') ? undefined : json['law_num_year'],
        'lawNumType': !exists(json, 'law_num_type') ? undefined : LawTypeFromJSON(json['law_num_type']),
        'lawNumNum': !exists(json, 'law_num_num') ? undefined : json['law_num_num'],
        'promulgationDate': !exists(json, 'promulgation_date') ? undefined : (new Date(json['promulgation_date'])),
    };
}

export function LawInfoToJSON(value?: LawInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'law_type': LawTypeToJSON(value.lawType),
        'law_id': value.lawId,
        'law_num': value.lawNum,
        'law_num_era': EraToJSON(value.lawNumEra),
        'law_num_year': value.lawNumYear,
        'law_num_type': LawTypeToJSON(value.lawNumType),
        'law_num_num': value.lawNumNum,
        'promulgation_date': value.promulgationDate === undefined ? undefined : (value.promulgationDate.toISOString().substring(0,10)),
    };
}

