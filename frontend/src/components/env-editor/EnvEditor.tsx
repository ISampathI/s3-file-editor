import React from "react";
import "./styles.scss";
import { Form, Input, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  key: React.Key;
  value: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Key",
    dataIndex: "key",
    width: "30%",
    sorter: (a, b) => String(a.key).localeCompare(String(b.key)),
  },
  {
    title: "Value",
    dataIndex: "value",
    width: "70%",
    sorter: (a, b) => String(a.key).localeCompare(String(b.key)),
  },
];

const data: DataType[] = [
  {
    key: "1",
    value: "kdfjdkfjwn",
  },
  {
    key: "2",
    value: "kdfjdkfjn",
  },
  {
    key: "3",
    value: "kdfjdkfjk",
  },
  {
    key: "4",
    value: "kdfjdkfj",
  },
  {
    key: "4",
    value: "kdfjdkfj",
  },
  {
    key: "4",
    value: "kdfjdkfj",
  },
  {
    key: "4",
    value: "kdfjdkfj",
  },
  {
    key: "4",
    value: "kdfjdkfj",
  },
  {
    key: "4",
    value: "kdfjdkfj",
  },
  {
    key: "4",
    value: "kdfjdkfj",
  },
];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "text";
  record: DataType;
  index: number;
  key: string;
  value: string;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  key,
  value,
  children,
  ...restProps
}) => {
  const [isEditable, setIsEditable] = React.useState<boolean>(false);

  return (
    <td
      {...restProps}
      onDoubleClick={() => {
        console.log(editing,
          dataIndex,
          title,
          inputType,
          record,
          index,
          children,
          key,
          value
          
          );
        
        setIsEditable(true);
      }}
    >
      {isEditable ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input
            autoFocus
            onBlur={() => {
              setIsEditable(false);
            }}
            defaultValue={1}
          />
        </Form.Item>
      ) : (
        children 
      )}
    </td>
  );
};

interface EnvEditorProps {
  fileData: string;
}
export default function EnvEditor({ fileData }: EnvEditorProps) {
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);

  React.useEffect(() => {
    const data = fileData.split("\n").map((item) => {
      const [key, value] = item.split("=");
      return { key, value };
    });
    setDataSource(data);
  }, [fileData]);

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="EnvEditor">
      <div className="header">
        <span>Environment Variables</span>
      </div>
      <div className="table-wrapper">
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          className="table"
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
}
