This is an application designed for PostoCard.

Tech Stack:

PHP Laravel,
React,
MySQL,



Dataase Setup:

User with AccessRole and IsAdmin.

Access Role List.(ID, RoleName)

Access Details List.(ID, DocName, AccessRole[ForeignLink], Read, Create, Submit, Delete, Export, Edit,IsActive)

Category List(ID, CategoryName, IsActive)

SubCategory List(ID, SubCategoryName,Category[ForeignLink] IsActive)

Product List(ID, ProductName, Category[ForeignLink], SubCategory[ForeignLink], IsSubmitted, Price, Artist, File1, File2, File3, File4, UploadedBy, UploadingDate)
