const {
  definitions: definitionsCVSS_v2_0,
  ...cvss_v2_0
} = require('./cvss-v2.0.json')
const {
  definitions: definitionsCVSS_v3_0,
  ...cvss_v3_0
} = require('./cvss-v3.0.json')
const {
  definitions: definitionsCVSS_v3_1,
  ...cvss_v3_1
} = require('./cvss-v3.1.json')

module.exports = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'https://raw.githubusercontent.com/oasis-tcs/csaf/master/csaf_2.0/json_schema/csaf_json_schema.json',
  title: 'Common Security Advisory Framework',
  description:
    'Representation of security advisory information as a JSON document.',
  type: 'object',
  definitions: {
    ...definitionsCVSS_v2_0,
    ...definitionsCVSS_v3_0,
    ...definitionsCVSS_v3_1,
    acknowledgments_t: {
      title: 'List of acknowledgments',
      description: 'Contains a list of acknowledgment elements.',
      type: 'array',
      minItems: 1,
      items: {
        title: 'Acknowledgment',
        description:
          'Acknowledges contributions by describing those that contributed.',
        type: 'object',
        minProperties: 1,
        properties: {
          names: {
            title: 'List of acknowledged names',
            description: 'Contains the names of entities being recognized.',
            type: 'array',
            minItems: 1,
            items: {
              title: 'Name of entity being recognized',
              description: 'Contains the name of a single person.',
              type: 'string',
              minLength: 1,
              examples: ['Johann Sebastian Bach', 'Albert Einstein'],
            },
          },
          organizations: {
            title: 'List of contributing organizations',
            description:
              'Contains the names of contributing organizations being recognized.',
            type: 'array',
            minItems: 1,
            items: {
              title: 'Contributing organization',
              description: 'Contains the name of a single organization.',
              type: 'string',
              minLength: 1,
              examples: ['CISA', 'Talos', 'Google Project Zero'],
            },
          },
          summary: {
            title: 'Summary of the acknowledgment',
            description:
              'SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.',
            type: 'string',
            minLength: 1,
            examples: [
              'First analysis of Coordinated Multi-Stream Attack (CMSA)',
            ],
          },
          urls: {
            title: 'List of URLs',
            description:
              'Specifies a list of URLs or location of the reference to be acknowledged.',
            type: 'array',
            minItems: 1,
            items: {
              title: 'URL of acknowledgment',
              description:
                'Contains the URL or location of the reference to be acknowledged.',
              type: 'string',
              format: 'uri',
            },
          },
        },
      },
    },
    branches_t: {
      title: 'List of branches',
      description:
        'Contains branch elements as children of the current element.',
      type: 'array',
      minItems: 1,
      items: {
        title: 'Branch',
        description:
          'Is a part of the hierarchical structure of the product tree.',
        type: 'object',
        maxProperties: 3,
        minProperties: 3,
        required: ['name', 'type'],
        properties: {
          name: {
            title: 'Name of the branch',
            description:
              "Contains the canonical descriptor or 'friendly name' of the branch.",
            type: 'string',
            minLength: 1,
            examples: [
              'Microsoft',
              'Siemens',
              'Windows',
              'Office',
              'SIMATIC',
              '10',
              '365',
              'PCS 7',
            ],
          },
          type: {
            title: 'Type of the branch',
            description: 'Describes the characteristics of the labeled branch.',
            type: 'string',
            enum: [
              'architecture',
              'host_name',
              'language',
              'legacy',
              'patch_level',
              'product_family',
              'product_name',
              'product_version',
              'service_pack',
              'specification',
              'vendor',
            ],
          },
          //   branches: {
          //     $ref: '#/definitions/branches_t',
          //   },
          product: {
            $ref: '#/definitions/full_product_name_t',
          },
        },
      },
    },
    full_product_name_t: {
      title: 'Full product name',
      description:
        'Specifies information about the product and assigns the product_id.',
      type: 'object',
      required: ['product_id', 'name'],
      properties: {
        product_id: {
          $ref: '#/definitions/product_id_t',
        },
        name: {
          title: 'Textual description of the product',
          description:
            'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
          type: 'string',
          minLength: 1,
          examples: [
            'Microsoft Host Integration Server 2006 Service Pack 1',
            'Cisco AnyConnect Secure Mobility Client 2.3.185',
          ],
        },
        cpe: {
          $comment:
            'TODO: This should have a full regular expression to enforce CPE syntax.',
          title: 'Common Platform Enumeration representation',
          description:
            'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
          type: 'string',
          pattern:
            '^(?i)cpe:(/|\\d+\\.\\d+)[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*$',
          minLength: 5,
        },
      },
    },
    lang_t: {
      title: 'Language type',
      description:
        'Identifies a language, corresponding to IETF BCP 47 / RFC 5646. See IETF language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
      type: 'string',
      pattern: '^[a-zA-Z]{2,3}(-.+)?$',
      examples: ['de', 'en', 'fr', 'frc', 'jp'],
    },
    notes_t: {
      title: 'List of notes',
      description: 'Contains notes which are specific to the current context.',
      type: 'array',
      minItems: 1,
      items: {
        title: 'Note',
        description:
          'Is a place to put all manner of text blobs related to the current context.',
        type: 'object',
        required: ['type', 'text'],
        properties: {
          audience: {
            title: 'Audience of note',
            description: 'Indicate who is intended to read it.',
            type: 'string',
            minLength: 1,
            examples: [
              'all',
              'executives',
              'operational management and system administrators',
              'safety engineers',
            ],
          },
          title: {
            title: 'Title of note',
            description:
              'Provides a concise description of what is contained in the text of the note.',
            type: 'string',
            minLength: 1,
            examples: [
              'Details',
              'Executive summary',
              'Technical summary',
              'Impact on safety systems',
            ],
          },
          type: {
            title: 'Note type',
            description: 'Choice of what kind of note this is.',
            type: 'string',
            enum: [
              'description',
              'details',
              'faq',
              'general',
              'legal_disclaimer',
              'other',
              'summary',
            ],
          },
          text: {
            title: 'Note contents',
            description:
              'The contents of the note. Content varies depending on type.',
            type: 'string',
            minLength: 1,
          },
        },
      },
    },
    products_t: {
      title: 'List of product_ids',
      description:
        'Specifies a list of product_ids to give context to the parent item.',
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        $ref: '#/definitions/product_id_t',
      },
    },
    product_groups_t: {
      title: 'List of product_group_ids',
      description:
        'Specifies a list of product_group_ids to give context to the parent item.',
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        $ref: '#/definitions/product_group_id_t',
      },
    },
    product_group_id_t: {
      title: 'Reference token for product group instance',
      description:
        'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
      type: 'string',
      minLength: 1,
      examples: ['CSAFGID-0001', 'CSAFGID-0002', 'CSAFGID-0020'],
    },
    product_id_t: {
      title: 'Reference token for product instance',
      description:
        'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
      type: 'string',
      minLength: 1,
      examples: ['CVRFPID-0004', 'CVRFPID-0008'],
    },
    references_t: {
      title: 'List of references',
      description: 'Holds a list of references.',
      type: 'array',
      minItems: 1,
      items: {
        title: 'Reference',
        description:
          'Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.',
        type: 'object',
        required: ['url', 'summary'],
        properties: {
          summary: {
            title: 'Summary of the reference',
            description: 'Indicates what this reference refers to.',
            type: 'string',
            minLength: 1,
          },
          type: {
            title: 'Type of reference',
            description:
              'Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.',
            type: 'string',
            default: 'external',
            enum: ['external', 'self'],
          },
          url: {
            title: 'URL of reference',
            description: 'Provides the URL for the reference.',
            type: 'string',
            format: 'uri',
          },
        },
      },
    },
    version_t: {
      title: 'Version',
      description:
        "Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version.",
      type: 'string',
      pattern: '^(0|[1-9][0-9]*)(\\.(0|[1-9][0-9]*)){0,3}$',
      examples: ['1', '0.9', '1.4.3', '2.40.0.320002'],
    },
  },
  required: ['document'],
  properties: {
    document: {
      title: 'Document level meta-data',
      description:
        'Captures the meta-data about this document describing a particular set of security advisories.',
      type: 'object',
      required: ['csaf_version', 'title', 'publisher', 'type', 'tracking'],
      properties: {
        acknowledgments: {
          $ref: '#/definitions/acknowledgments_t',
        },
        aggregate_severity: {
          title: 'Aggregate severity',
          description:
            "Is a vehicle that is provided by the document producer to convey the urgency and criticality with which the one or more vulnerabilities reported should be addressed. It is a document-level metric and applied to the document as a whole — not any specific vulnerability. The range of values in this field is defined according to the document producer's policies and procedures.",
          type: 'object',
          required: ['text'],
          properties: {
            namespace: {
              title: 'Namespace of aggregate severity',
              description: 'Points to the namespace so referenced.',
              type: 'string',
              format: 'uri',
            },
            text: {
              title: 'Text of aggregate severity',
              description:
                'Provides a severity which is independent of - and in addition to - any other standard metric for determining the impact or severity of a given vulnerability (such as CVSS).',
              type: 'string',
              minLength: 1,
              examples: ['Moderate', 'Important', 'Critical'],
            },
          },
        },
        csaf_version: {
          title: 'CSAF version',
          description:
            'Gives the version of the CSAF specification which the document was generated for.',
          type: 'string',
          enum: ['2.0'],
        },
        distribution: {
          title: 'Rules for sharing document',
          description:
            'Describe any constraints on how this document might be shared.',
          type: 'object',
          minProperties: 1,
          properties: {
            text: {
              title: 'Textual description',
              description:
                'Provides a textual description of additional constraints.',
              type: 'string',
              minLength: 1,
              examples: [
                'Share only on a need-to-know-basis only.',
                'Distribute freely.',
                'Copyright 2019, Example Company, All Rights Reserved.',
              ],
            },
            tlp: {
              title: 'Traffic Light Protocol (TLP)',
              description:
                'Provides details about the TLP classification of the document.',
              type: 'object',
              required: ['label'],
              properties: {
                label: {
                  title: 'Label of TLP',
                  description: 'Provides the TLP label of the document.',
                  type: 'string',
                  enum: ['RED', 'AMBER', 'GREEN', 'WHITE'],
                },
                url: {
                  title: 'URL of TLP version',
                  description:
                    'Provides a URL where to find the textual description of the TLP version which is used in this document. Default is the URL to the definition by FIRST.',
                  type: 'string',
                  default: 'https://www.first.org/tlp/',
                  format: 'uri',
                  examples: [
                    'https://www.us-cert.gov/tlp',
                    'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Kritis/Merkblatt_TLP.pdf',
                  ],
                },
              },
            },
          },
        },
        lang: {
          title: 'Document language',
          description:
            'Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646.',
          $ref: '#/definitions/lang_t',
        },
        source_lang: {
          title: 'Source language',
          description:
            'If this copy of the document is a translation then the value of this property describes from which language this document was translated.',
          $ref: '#/definitions/lang_t',
        },
        notes: {
          title: 'Notes associated with the whole document.',
          description: 'Holds notes about this set of vulnerabilities.',
          $ref: '#/definitions/notes_t',
        },
        publisher: {
          title: 'Publisher',
          description:
            'Provides information about the publisher of the document.',
          type: 'object',
          required: ['type'],
          properties: {
            contact_details: {
              title: 'Contact details',
              description:
                'Information on how to contact the publisher, possibly including details such as web sites, email addresses, phone numbers, and postal mail addresses.',
              type: 'string',
              minLength: 1,
              examples: [
                'Example Company can be reached at contact_us@example.com, or via our website at https://www.example.com/contact.',
              ],
            },
            issuing_authority: {
              title: 'Issuing authority',
              description:
                "The name of the issuing party and their authority to release the document, in particular, the party's constituency and responsibilities or other obligations.",
              type: 'string',
              minLength: 1,
            },
            type: {
              title: 'Type of publisher',
              description:
                'Provides information about the type of publisher releasing the document.',
              type: 'string',
              enum: ['coordinator', 'discoverer', 'other', 'user', 'vendor'],
            },
            vendor_id: {
              title: 'Vendor releasing the document',
              description:
                'Vendor ID is a unique identifier (OID) that a vendor uses as issued by FIRST under the auspices of IETF.',
              type: 'string',
              minLength: 1,
            },
          },
        },
        references: {
          $ref: '#/definitions/references_t',
        },
        title: {
          title: 'Title of this document',
          description:
            'This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents.',
          type: 'string',
          minLength: 1,
          examples: [
            'Example Company Cross-Site-Scripting Vulnerability in Example Generator',
            'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
          ],
        },
        tracking: {
          title: 'Tracking',
          description:
            'Is a container designated to hold all management attributes necessary to track a CSAF document as a whole.',
          type: 'object',
          required: [
            'current_release_date',
            'id',
            'initial_release_date',
            'revision_history',
            'status',
            'version',
          ],
          properties: {
            id: {
              title: 'Unique identifier for the document',
              description:
                'The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority.',
              type: 'string',
              minLength: 1,
              examples: [
                'Example Company - 2019-YH3234',
                'RHBA-2019:0024',
                'cisco-sa-20190513-secureboot',
              ],
            },
            aliases: {
              title: 'Aliases',
              description:
                'Contains a list of alternate names for the same document.',
              type: 'array',
              minItems: 1,
              uniqueItems: true,
              items: {
                title: 'Alternate name',
                description:
                  'Specifies a non-empty string that represents a distinct optional alternative ID used to refer to the document.',
                type: 'string',
                minLength: 1,
                examples: ['CVE-2019-12345'],
              },
            },
            current_release_date: {
              title: 'Current release date',
              description:
                'The date when the current revision of this document was released',
              type: 'string',
              format: 'date-time',
            },
            generator: {
              title: 'Document generator',
              description:
                'Is a container to hold all elements related to the generation of the document. These items will reference when the document was actually created, including the date it was generated and the entity that generated it.',
              type: 'object',
              required: ['engine'],
              properties: {
                engine: {
                  title: 'Engine of document generation',
                  description:
                    'This string SHOULD represent the name of the engine that generated the CSAF document, and MAY additionally refer to its version.',
                  type: 'string',
                  minLength: 1,
                  examples: [
                    'TVCE',
                    'Red Hat rhsa-to-cvrf 2.1',
                    'CMPFA Core Converter CVRF->CSAF Version 0.6',
                  ],
                },
                date: {
                  title: 'Date of document generation',
                  description:
                    'This SHOULD be the current date that the document was generated. Because documents are often generated internally by a document producer and exist for a nonzero amount of time before being released, this field MAY be different from the Initial Release Date and Current Release Date.',
                  type: 'string',
                  format: 'date-time',
                },
              },
            },
            initial_release_date: {
              title: 'Initial release date',
              description: 'The date when this document was first published.',
              type: 'string',
              format: 'date-time',
            },
            revision_history: {
              title: 'Revision history',
              description:
                'Contains all the information elements required to track the evolution of a CSAF document.',
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                required: ['number', 'date', 'summary'],
                properties: {
                  number: {
                    $ref: '#/definitions/version_t',
                  },
                  date: {
                    title: 'Date of the revision',
                    description: 'The date of the revision entry',
                    type: 'string',
                    format: 'date-time',
                  },
                  summary: {
                    title: 'Summary of the revision',
                    description:
                      'Holds a single non-empty string representing a short description of the changes.',
                    type: 'string',
                    minLength: 1,
                  },
                },
              },
            },
            status: {
              title: 'Document status',
              description: 'Defines the draft status of the document.',
              type: 'string',
              enum: ['draft', 'final', 'interim'],
            },
            version: {
              $ref: '#/definitions/version_t',
            },
          },
        },
        type: {
          title: 'Document type',
          description:
            'Defines a short canonical name, chosen by the document producer, which will inform the end user as to the type of document.',
          type: 'string',
          minLength: 1,
          examples: [
            'Security Advisory',
            'Security Notice',
            'Vulnerability Report',
          ],
        },
      },
    },
    product_tree: {
      title: 'Product tree',
      description:
        'Is a container for all fully qualified product names that can be referenced elsewhere in the document.',
      type: 'object',
      minProperties: 1,
      properties: {
        branches: {
          $ref: '#/definitions/branches_t',
        },
        full_product_names: {
          title: 'List of full product names',
          description: 'Contains a list of full product names.',
          type: 'array',
          minItems: 1,
          items: {
            $ref: '#/definitions/full_product_name_t',
          },
        },
        product_groups: {
          title: 'List of product groups',
          description: 'Contains a list of product groups.',
          type: 'array',
          minItems: 1,
          items: {
            title: 'Product group',
            description:
              'Defines a new logical group of products that can then be referred to in other parts of the document to address a group of products with a single identifier.',
            type: 'object',
            required: ['group_id', 'product_ids'],
            properties: {
              summary: {
                title: 'Summary of the product group',
                description:
                  'Gives a short, optional description of the group.',
                type: 'string',
                minLength: 1,
                examples: [
                  'The x64 versions of the operating system.',
                  'Products supporting Modbus.',
                ],
              },
              group_id: {
                $ref: '#/definitions/product_group_id_t',
              },
              product_ids: {
                title: 'List of Product IDs',
                description:
                  'Lists the product_ids of those products which known as one group in the document.',
                type: 'array',
                minItems: 2,
                items: {
                  $ref: '#/definitions/product_id_t',
                },
              },
            },
          },
        },
        relationships: {
          title: 'List of relationships',
          description: 'Contains a list of relationships.',
          type: 'array',
          minItems: 1,
          items: {
            title: 'Relationship',
            description:
              'Establishes a link between two existing full_product_name_t elements, allowing the document producer to define a combination of two products that form a new full_product_name entry.',
            type: 'object',
            required: [
              'product_reference',
              'relates_to_product_reference',
              'relationship_type',
            ],
            properties: {
              full_product_name: {
                $ref: '#/definitions/full_product_name_t',
              },
              product_reference: {
                $ref: '#/definitions/product_id_t',
              },
              relates_to_product_reference: {
                $ref: '#/definitions/product_id_t',
              },
              relationship_type: {
                title: 'Relationship type',
                description:
                  'Defines the type of relationship for the referenced component.',
                type: 'string',
                enum: [
                  'default_component_of',
                  'optional_component_of',
                  'external_component_of',
                  'installed_on',
                  'installed_with',
                ],
              },
            },
          },
        },
      },
    },
    vulnerabilities: {
      title: 'Vulnerabilities',
      description:
        'Represents a list of all relevant vulnerability information items.',
      type: 'array',
      minItems: 1,
      items: {
        title: 'Vulnerability',
        description:
          'Is a container for the aggregation of all fields that are related to a single vulnerability in the document.',
        type: 'object',
        minProperties: 1,
        properties: {
          acknowledgments: {
            $ref: '#/definitions/acknowledgments_t',
          },
          cve: {
            title: 'CVE',
            description:
              'Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability.',
            type: 'string',
            pattern: '^CVE-[0-9]{4}-[0-9]{4,}$',
          },
          cwe: {
            title: 'CWE',
            description:
              'Holds the MITRE standard Common Weakness Enumeration (CWE) for the weakness associated.',
            type: 'object',
            required: ['id', 'name'],
            properties: {
              id: {
                title: 'Weakness ID',
                description: 'Holds the ID for the weakness associated.',
                type: 'string',
                pattern: '^CWE-[1-9]\\d{0,5}$',
                examples: ['CWE-79', 'CWE-22', 'CWE-352'],
              },
              name: {
                title: 'Weakness name',
                description:
                  'Holds the full name of the weakness as given in the CWE specification.',
                type: 'string',
                minLength: 1,
                examples: [
                  "Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
                  "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                  'Cross-Site Request Forgery (CSRF)',
                ],
              },
            },
          },
          scores: {
            title: 'List of scores',
            description:
              'contains score objects for the currrent vulnerability.',
            type: 'array',
            minItems: 1,
            items: {
              title: 'Score',
              description:
                'specifies information about (at least one) score of the vulnerability and for which products the given value applies.',
              type: 'object',
              minItems: 2,
              required: ['products'],
              properties: {
                products: {
                  $ref: '#/definitions/products_t',
                },
                // cvss_v2: cvss_v2_0,
                // cvss_v3: {
                //   oneOf: [cvss_v3_0, cvss_v3_1],
                // },
              },
            },
          },
          discovery_date: {
            title: 'Discovery date',
            description:
              'Holds the date and time the vulnerability was originally discovered.',
            type: 'string',
            format: 'date-time',
          },
          id: {
            title: 'ID',
            description:
              'Gives the document producer a place to publish a unique label or tracking ID for the vulnerability (if such information exists).',
            type: 'object',
            required: ['system_name', 'text'],
            properties: {
              system_name: {
                title: 'System name',
                description:
                  'Indicates the name of the vulnerability tracking or numbering system.',
                type: 'string',
                minLength: 1,
                examples: ['Cisco Bug ID'],
              },
              text: {
                title: 'Text',
                description:
                  'Is unique label or tracking ID for the vulnerability (if such information exists).',
                type: 'string',
                minLength: 1,
                examples: ['CSCso66472'],
              },
            },
          },
          involvements: {
            title: 'List of involvements',
            description: 'Contains a list of involvements.',
            type: 'array',
            minItems: 1,
            items: {
              title: 'Involvement',
              description:
                'Is a container, that allows the document producers to comment on their level of Involvement (or engagement) in the vulnerability identification, scoping, and remediation process.',
              type: 'object',
              required: ['party', 'status'],
              properties: {
                summary: {
                  title: 'Summary of the involvement',
                  description:
                    'Contains additional context regarding what is going on.',
                  type: 'string',
                  minLength: 1,
                },
                party: {
                  title: 'Party type',
                  description: 'Defines the type of the involved party.',
                  type: 'string',
                  enum: [
                    'coordinator',
                    'discoverer',
                    'other',
                    'user',
                    'vendor',
                  ],
                },
                status: {
                  title: 'Party status',
                  description: 'Defines contact status of the involved party.',
                  type: 'string',
                  enum: [
                    'completed',
                    'contact_accepted',
                    'disputed',
                    'in_progress',
                    'not_contacted',
                    'open',
                  ],
                },
              },
            },
          },
          notes: {
            $ref: '#/definitions/notes_t',
          },
          product_status: {
            title: 'Product status',
            description:
              'Contains different lists of product_ids which provide details on the status of the referenced product related to the current vulnerability. ',
            type: 'object',
            minProperties: 1,
            properties: {
              fixed: {
                title: 'Fixed',
                description:
                  'These versions contain a fix for the vulnerability but may not be the recommended fixed versions.',
                $ref: '#/definitions/products_t',
              },
              first_fixed: {
                title: 'First fixed',
                description:
                  'These versions contain the first fix for the vulnerability but may not be the recommended fixed versions.',
                $ref: '#/definitions/products_t',
              },
              recommended: {
                title: 'Recommended',
                description:
                  'These versions have a fix for the vulnerability and are the vendor-recommended versions for fixing the vulnerability.',
                $ref: '#/definitions/products_t',
              },
              known_affected: {
                title: 'Known affected',
                description:
                  'These versions are known to be affected by the vulnerability.',
                $ref: '#/definitions/products_t',
              },
              first_affected: {
                title: 'First affected',
                description:
                  'These are the first versions of the releases known to be affected by the vulnerability.',
                $ref: '#/definitions/products_t',
              },
              last_affected: {
                title: 'Last affected',
                description:
                  'These are the last versions in a release train known to be affected by the vulnerability. Subsequently released versions would contain a fix for the vulnerability.',
                $ref: '#/definitions/products_t',
              },
              known_not_affected: {
                title: 'Known not affected',
                description:
                  'These versions are known not to be affected by the vulnerability.',
                $ref: '#/definitions/products_t',
              },
              under_investigation: {
                title: 'Under investigation',
                description:
                  'It is not known yet whether this version is or is not affected by the vulnerability. However, it is still under investigation - the result will be provided in a later release of the document.',
                $ref: '#/definitions/products_t',
              },
            },
          },
          references: {
            $ref: '#/definitions/references_t',
          },
          release_date: {
            title: 'Release date',
            description:
              'Holds the date and time the vulnerability was originally released into the wild.',
            type: 'string',
            format: 'date-time',
          },
          remediations: {
            title: 'List of remediations',
            description: 'Contains a list of remediations.',
            type: 'array',
            minItems: 1,
            items: {
              title: 'Remediation',
              description:
                'Specifies details on how to handle (and presumably, fix) a vulnerability.',
              type: 'object',
              required: ['details', 'type'],
              properties: {
                date: {
                  title: 'Date of the remediation',
                  description:
                    'Contains the date from which the remediation is available.',
                  type: 'string',
                  format: 'date-time',
                },
                details: {
                  title: 'Details of the remediation',
                  description:
                    'Contains a thorough human-readable discussion of the remediation.',
                  type: 'string',
                  minLength: 1,
                },
                entitlements: {
                  title: 'List of entitlements',
                  description: 'Contains a list of entitlements.',
                  type: 'array',
                  minItems: 1,
                  items: {
                    title: 'Entitlement of the remediation',
                    description:
                      'Contains any possible vendor-defined constraints for obtaining fixed software or hardware that fully resolves the vulnerability.',
                    type: 'string',
                    minLength: 1,
                  },
                },
                group_ids: {
                  $ref: '#/definitions/product_groups_t',
                },
                product_ids: {
                  $ref: '#/definitions/products_t',
                },
                restart_required: {
                  title: 'Restart required by remediation',
                  description:
                    'Provides information on type of restart is required by this remediation to become effective.',
                  type: 'object',
                  required: ['type'],
                  properties: {
                    type: {
                      title: 'Type of restart',
                      description:
                        'Specifies what type of restart is required by this remediation to become effective.',
                      type: 'string',
                      enum: [
                        'none',
                        'vulnerable_component',
                        'service',
                        'parent',
                        'dependencies',
                        'connected',
                        'machine',
                        'zone',
                        'system',
                      ],
                    },
                    details: {
                      title: 'Additional restart information',
                      description:
                        'Provides additional information for the restart. This can include details on procedures, scope or impact.',
                      type: 'string',
                      minLength: 1,
                    },
                  },
                },
                type: {
                  title: 'Type of the remediation',
                  description:
                    'Specifies the type which this remediation belongs to.',
                  type: 'string',
                  enum: [
                    'workaround',
                    'mitigation',
                    'vendor_fix',
                    'none_available',
                    'no_fix_planned',
                  ],
                },
                url: {
                  title: 'URL to the remediation',
                  description:
                    'Contains the URL where to obtain the remediation.',
                  type: 'string',
                  format: 'uri',
                },
              },
            },
          },
          threats: {
            title: 'List of threats',
            description:
              'Contains information about a vulnerability that can change with time.',
            type: 'array',
            minItems: 1,
            items: {
              title: 'Threat',
              description:
                'Contains the vulnerability kinetic information. This information can change as the vulnerability ages and new information becomes available.',
              type: 'object',
              required: ['details', 'type'],
              properties: {
                type: {
                  title: 'Type of the threat',
                  description:
                    'Categorizes the threat according to the rules of the specification.',
                  type: 'string',
                  enum: ['impact', 'exploit_status', 'target_set'],
                },
                details: {
                  title: 'Details of the threat',
                  description:
                    'Represents a thorough human-readable discussion of the threat.',
                  type: 'string',
                  minLength: 1,
                },
                date: {
                  title: 'Date of the threat',
                  description:
                    'Contains the date when the assessment was done or the threat appeared.',
                  type: 'string',
                  format: 'date-time',
                },
                product_ids: {
                  $ref: '#/definitions/products_t',
                },
                group_ids: {
                  $ref: '#/definitions/product_groups_t',
                },
              },
            },
          },
          title: {
            title: 'Title',
            description:
              'Gives the document producer the ability to apply a canonical name or title to the vulnerability.',
            type: 'string',
            minLength: 1,
          },
        },
      },
    },
  },
}
