# Sqoop이란

SQL to Hadoop -> RDB와 HDSF 사이의 양방향 데이터 전송을 위한 툴. 오직 두 포인트 사이의 데이터 통신을 쉽게 다루기 위해 개발된 프로젝트이다.

![](assets/2022-08-31-17-40-43-image.png)

![](assets/2022-08-31-17-42-41-image.png)

Sqoop은 하둡의 리소스 관리자인 YARN과 MapReduce, HDFS 위에서 동작한다.

단순히 CLI로 sqoop을 실행할 수 있다. RDB를 제어하는 다양한 종류의 CLI를 지원한다.

![](assets/2022-08-31-17-51-23-image.png)

Sqoop CLI 명령어 -> sqoop 프로세서가 해당 명령어와 관련된 메타 데이터를 RDB에서 가져옴 -> 메타 데이터를 참조하여 YARN 리소스 관리자를 통해 MAP 프로세스를 실행 -> 병렬 인자가 있는 CLI라면 여러 개의 MAP 프로세스가 실행되어 병렬성을 가진다

RDB와 통신하기 위해 JDBC 프로토콜이 요구되기 때문에 각 종류에 맞는 JDBC 드라이버를 미리 준비하여 하둡 실행 전 외부 라이브러리로 포함시켜야 한다.



# Sqoop 시작하기

sqoop list-databases : 여러 개의 db를 포함하는 db 클러스터로 구성된 RDB 서버의 주소를 통해 모든 db의 이름을 추출한다

```shell
$ sqoop list-databases \

--driver "com.mysql.jdbc.Driver" \
--connect "jdbc:mysql://hereis.dbcluster.path:port" \
--username "XXXX" \
--password "XXXX" \
--verbose
```



sqoop-list-tables
















































